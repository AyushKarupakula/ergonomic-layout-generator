import rhinoscriptsyntax as rs
import Rhino.Geometry as rg
from typing import Dict, List, Tuple
from utils.logger import setup_logger
import json
import os

logger = setup_logger()

class RhinoIntegration:
    """Handles integration with Rhino and Grasshopper for layout visualization."""
    
    def __init__(self, grasshopper_file: str = None):
        self.logger = setup_logger()
        self.gh_file = grasshopper_file or "grasshopper_scripts/layout_generator.gh"
        
    def create_layout_geometry(self, layout: Dict) -> None:
        """Create 3D geometry in Rhino based on layout specification."""
        try:
            # Clear existing geometry
            rs.DeleteObjects(rs.AllObjects())
            
            # Create room boundaries
            self._create_room_boundary(layout)
            
            # Create desk
            self._create_desk(layout['desk'])
            
            # Create storage
            self._create_storage(layout['storage'])
            
            # Create equipment
            self._create_equipment(layout['equipment_zones'])
            
            # Create spacing indicators
            self._create_spacing_zones(layout['spacing'])
            
            logger.info("Successfully created layout geometry in Rhino")
            
        except Exception as e:
            logger.error(f"Error creating Rhino geometry: {str(e)}")
            raise
    
    def _create_room_boundary(self, layout: Dict) -> None:
        """Create room boundary rectangle."""
        width = layout.get('room_width', 5000)  # Default 5m if not specified
        length = layout.get('room_length', 5000)
        
        points = [
            rg.Point3d(0, 0, 0),
            rg.Point3d(width, 0, 0),
            rg.Point3d(width, length, 0),
            rg.Point3d(0, length, 0)
        ]
        
        polyline = rg.Polyline(points)
        rs.AddPolyline(polyline)
    
    def _create_desk(self, desk_spec: Dict) -> None:
        """Create desk geometry."""
        x, y = desk_spec['position']
        width, depth = desk_spec['dimensions']
        angle = desk_spec['orientation']
        
        # Create desk surface
        rect = rs.AddRectangle(
            rg.Plane.WorldXY,
            width,
            depth
        )
        
        # Move to position and rotate
        rs.MoveObject(rect, rg.Point3d(x, y, 0))
        rs.RotateObject(
            rect,
            rg.Point3d(x, y, 0),
            angle
        )
        
        # Add layer and color
        rs.ObjectLayer(rect, "Desk")
        rs.ObjectColor(rect, (255, 0, 0))
    
    def _create_storage(self, storage_spec: Dict) -> None:
        """Create storage unit geometry."""
        x, y = storage_spec['position']
        width, depth = storage_spec['dimensions']
        
        # Create storage surface
        rect = rs.AddRectangle(
            rg.Plane.WorldXY,
            width,
            depth
        )
        
        # Move to position
        rs.MoveObject(rect, rg.Point3d(x, y, 0))
        
        # Add layer and color
        rs.ObjectLayer(rect, "Storage")
        rs.ObjectColor(rect, (0, 255, 0))
    
    def _create_equipment(self, equipment_spec: Dict) -> None:
        """Create equipment zone geometry."""
        for i, pos in enumerate(equipment_spec['monitor_positions']):
            x, y = pos
            
            # Create monitor representation
            monitor = rs.AddRectangle(
                rg.Plane.WorldXY,
                60,  # Standard monitor width
                30   # Standard monitor depth
            )
            
            # Move to position
            rs.MoveObject(monitor, rg.Point3d(x, y, 0))
            
            # Add layer and color
            rs.ObjectLayer(monitor, "Equipment")
            rs.ObjectColor(monitor, (0, 0, 255))
    
    def _create_spacing_zones(self, spacing_spec: Dict) -> None:
        """Create visualization of spacing and clearance zones."""
        clearance = spacing_spec['clearance']
        walkways = spacing_spec['walkways']
        
        # Create clearance zones around furniture
        # (Implementation depends on specific visualization needs)
        pass
    
    def export_to_grasshopper(self, layout: Dict, output_file: str) -> None:
        """Export layout data to Grasshopper for parametric modeling."""
        try:
            # Convert layout to Grasshopper-compatible format
            gh_data = {
                "layout": layout,
                "parameters": {
                    "wall_height": 2700,  # Standard wall height
                    "ceiling_height": 3000,
                    "material_specs": {
                        "desk": "wood",
                        "storage": "metal",
                        "walls": "plaster"
                    }
                }
            }
            
            # Save to temporary JSON file for Grasshopper to read
            temp_path = os.path.join(os.path.dirname(self.gh_file), "temp_layout.json")
            with open(temp_path, 'w') as f:
                json.dump(gh_data, f, indent=4)
            
            # TODO: Implement Grasshopper script execution
            logger.info(f"Layout data exported for Grasshopper: {temp_path}")
            
        except Exception as e:
            logger.error(f"Error exporting to Grasshopper: {str(e)}")
            raise
