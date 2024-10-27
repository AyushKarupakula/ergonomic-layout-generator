from typing import Dict, Optional
import clr
import System
from utils.logger import setup_logger
from pathlib import Path

# Add Revit API references
clr.AddReference('RevitAPI')
clr.AddReference('RevitAPIUI')
from Autodesk.Revit.DB import *

logger = setup_logger()

class RevitExporter:
    """Handles export of workspace layouts to Revit."""
    
    def __init__(self, doc=None):
        self.doc = doc  # Revit document
        self.logger = setup_logger()
        
        # Load Revit family types
        self.desk_family_type = None
        self.storage_family_type = None
        self._load_family_types()
    
    def _load_family_types(self) -> None:
        """Load required Revit family types."""
        try:
            if self.doc:
                # Get desk family type
                desk_collector = FilteredElementCollector(self.doc)\
                    .OfCategory(BuiltInCategory.OST_Furniture)\
                    .OfClass(FamilySymbol)
                
                for family_type in desk_collector:
                    if "Desk" in family_type.Family.Name:
                        self.desk_family_type = family_type
                        break
                
                # Get storage family type
                storage_collector = FilteredElementCollector(self.doc)\
                    .OfCategory(BuiltInCategory.OST_Furniture)\
                    .OfClass(FamilySymbol)
                
                for family_type in storage_collector:
                    if "Storage" in family_type.Family.Name:
                        self.storage_family_type = family_type
                        break
                
        except Exception as e:
            logger.error(f"Error loading Revit family types: {str(e)}")
            raise
    
    def export_layout(self, layout: Dict, template_path: Optional[str] = None) -> None:
        """Export layout to Revit."""
        try:
            # Create new Revit document if none exists
            if not self.doc and template_path:
                self._create_new_document(template_path)
            
            # Start transaction
            with Transaction(self.doc, "Create Workspace Layout") as trans:
                trans.Start()
                
                try:
                    # Create room boundaries
                    self._create_room_boundaries(layout)
                    
                    # Place furniture
                    self._place_desk(layout['desk'])
                    self._place_storage(layout['storage'])
                    
                    # Add dimensions and annotations
                    self._add_dimensions(layout)
                    
                    trans.Commit()
                    logger.info("Successfully exported layout to Revit")
                    
                except Exception as e:
                    trans.RollBack()
                    raise Exception(f"Error during Revit transaction: {str(e)}")
                
        except Exception as e:
            logger.error(f"Error exporting to Revit: {str(e)}")
            raise
    
    def _create_new_document(self, template_path: str) -> None:
        """Create a new Revit document from template."""
        try:
            app = self.doc.Application if self.doc else None
            if not app:
                raise Exception("Revit application not available")
            
            self.doc = app.NewProjectDocument(template_path)
            self._load_family_types()
            
        except Exception as e:
            logger.error(f"Error creating new Revit document: {str(e)}")
            raise
    
    def _create_room_boundaries(self, layout: Dict) -> None:
        """Create room boundaries in Revit."""
        try:
            # Get level
            level = FilteredElementCollector(self.doc)\
                .OfClass(Level)\
                .FirstElement()
            
            if not level:
                raise Exception("No levels found in document")
            
            # Create walls
            width = layout.get('room_width', 5000)  # mm
            length = layout.get('room_length', 5000)  # mm
            
            # Convert to feet (Revit's internal unit)
            width_ft = width / 304.8
            length_ft = length / 304.8
            
            # Create wall lines
            lines = [
                Line.CreateBound(XYZ(0, 0, 0), XYZ(width_ft, 0, 0)),
                Line.CreateBound(XYZ(width_ft, 0, 0), XYZ(width_ft, length_ft, 0)),
                Line.CreateBound(XYZ(width_ft, length_ft, 0), XYZ(0, length_ft, 0)),
                Line.CreateBound(XYZ(0, length_ft, 0), XYZ(0, 0, 0))
            ]
            
            # Create walls
            for line in lines:
                Wall.Create(self.doc, line, level.Id, True)
                
        except Exception as e:
            logger.error(f"Error creating room boundaries: {str(e)}")
            raise
    
    def _place_desk(self, desk_spec: Dict) -> None:
        """Place desk family instance."""
        try:
            if not self.desk_family_type:
                raise Exception("Desk family type not found")
            
            # Convert coordinates to feet
            x = desk_spec['position'][0] / 304.8
            y = desk_spec['position'][1] / 304.8
            rotation = desk_spec['orientation'] * (System.Math.PI / 180)
            
            # Create instance
            level = FilteredElementCollector(self.doc).OfClass(Level).FirstElement()
            location = XYZ(x, y, 0)
            
            instance = self.doc.Create.NewFamilyInstance(
                location,
                self.desk_family_type,
                level,
                Autodesk.Revit.DB.Structure.StructuralType.NonStructural
            )
            
            # Rotate instance
            axis = Line.CreateBound(
                location,
                location.Add(XYZ(0, 0, 1))
            )
            ElementTransformUtils.RotateElement(
                self.doc,
                instance.Id,
                axis,
                rotation
            )
            
        except Exception as e:
            logger.error(f"Error placing desk: {str(e)}")
            raise
    
    def _place_storage(self, storage_spec: Dict) -> None:
        """Place storage family instance."""
        try:
            if not self.storage_family_type:
                raise Exception("Storage family type not found")
            
            # Convert coordinates to feet
            x = storage_spec['position'][0] / 304.8
            y = storage_spec['position'][1] / 304.8
            
            # Create instance
            level = FilteredElementCollector(self.doc).OfClass(Level).FirstElement()
            location = XYZ(x, y, 0)
            
            self.doc.Create.NewFamilyInstance(
                location,
                self.storage_family_type,
                level,
                Autodesk.Revit.DB.Structure.StructuralType.NonStructural
            )
            
        except Exception as e:
            logger.error(f"Error placing storage: {str(e)}")
            raise
    
    def _add_dimensions(self, layout: Dict) -> None:
        """Add dimensions and annotations to the layout."""
        try:
            # Implementation depends on specific dimensioning requirements
            pass
            
        except Exception as e:
            logger.error(f"Error adding dimensions: {str(e)}")
            raise
