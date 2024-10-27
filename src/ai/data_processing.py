import numpy as np
from typing import Dict, List, Tuple
from pathlib import Path
import json
from utils.logger import setup_logger

logger = setup_logger()

class DataProcessor:
    """Handles data processing for the workspace layout generator."""
    
    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.logger = setup_logger()
        
    def load_training_data(self) -> List[Dict]:
        """Load and preprocess training data from files."""
        try:
            training_data = []
            data_path = self.data_dir / "training_data.json"
            
            if data_path.exists():
                with open(data_path, 'r') as f:
                    raw_data = json.load(f)
                
                for item in raw_data:
                    processed_item = self._validate_and_process_item(item)
                    if processed_item:
                        training_data.append(processed_item)
            
            logger.info(f"Loaded {len(training_data)} training examples")
            return training_data
            
        except Exception as e:
            logger.error(f"Error loading training data: {str(e)}")
            raise
    
    def _validate_and_process_item(self, item: Dict) -> Dict:
        """Validate and process a single training data item."""
        required_fields = {
            'preferences': ['dimensions', 'work_style', 'noise_tolerance', 'equipment'],
            'layout': ['desk', 'storage', 'equipment_zones', 'spacing']
        }
        
        try:
            # Validate structure
            for category, fields in required_fields.items():
                if category not in item:
                    raise ValueError(f"Missing category: {category}")
                
                for field in fields:
                    if field not in item[category]:
                        raise ValueError(f"Missing field: {field} in {category}")
            
            # Process and normalize values
            processed_item = {
                'preferences': self._process_preferences(item['preferences']),
                'layout': self._process_layout(item['layout'])
            }
            
            return processed_item
            
        except Exception as e:
            logger.warning(f"Invalid training data item: {str(e)}")
            return None
    
    def _process_preferences(self, preferences: Dict) -> Dict:
        """Process and validate preference data."""
        processed = preferences.copy()
        
        # Validate and normalize dimensions
        for dim in ['width', 'length']:
            value = processed['dimensions'][dim]
            if not isinstance(value, (int, float)) or value <= 0:
                raise ValueError(f"Invalid {dim}: {value}")
            processed['dimensions'][dim] = float(value)
        
        # Validate work style
        valid_styles = {"Individual Focus", "Collaborative", "Hybrid", "Creative Studio"}
        if processed['work_style'] not in valid_styles:
            raise ValueError(f"Invalid work style: {processed['work_style']}")
        
        # Validate noise tolerance
        valid_noise_levels = {"Low", "Medium", "High"}
        if processed['noise_tolerance'] not in valid_noise_levels:
            raise ValueError(f"Invalid noise tolerance: {processed['noise_tolerance']}")
        
        return processed
    
    def _process_layout(self, layout: Dict) -> Dict:
        """Process and validate layout data."""
        processed = layout.copy()
        
        # Validate desk parameters
        desk = processed['desk']
        if not all(isinstance(v, (int, float)) for v in desk['position'] + desk['dimensions']):
            raise ValueError("Invalid desk parameters")
        
        # Validate storage parameters
        storage = processed['storage']
        if not all(isinstance(v, (int, float)) for v in storage['position'] + storage['dimensions']):
            raise ValueError("Invalid storage parameters")
        
        # Validate equipment zones
        for pos in processed['equipment_zones']['monitor_positions']:
            if not all(isinstance(v, (int, float)) for v in pos):
                raise ValueError("Invalid monitor position")
        
        return processed
    
    def save_generated_layout(self, layout: Dict, output_path: Path) -> None:
        """Save a generated layout to file."""
        try:
            with open(output_path, 'w') as f:
                json.dump(layout, f, indent=4)
            logger.info(f"Saved generated layout to {output_path}")
            
        except Exception as e:
            logger.error(f"Error saving layout: {str(e)}")
            raise
