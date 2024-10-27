from sklearn.tree import DecisionTreeRegressor
import numpy as np
from typing import Dict, List, Tuple
from utils.logger import setup_logger

logger = setup_logger()

class LayoutDecisionTree:
    """Decision tree for initial layout suggestions based on basic rules."""
    
    def __init__(self):
        self.desk_position_model = DecisionTreeRegressor(max_depth=5)
        self.storage_position_model = DecisionTreeRegressor(max_depth=5)
        self.logger = setup_logger()
        
    def train(self, training_data: List[Dict]) -> None:
        """Train decision trees on historical layout data."""
        try:
            X = self._extract_features(training_data)
            
            # Extract target variables
            desk_positions = np.array([
                list(data['layout']['desk']['position'])
                for data in training_data
            ])
            storage_positions = np.array([
                list(data['layout']['storage']['position'])
                for data in training_data
            ])
            
            # Train models
            self.desk_position_model.fit(X, desk_positions)
            self.storage_position_model.fit(X, storage_positions)
            
            logger.info("Decision trees trained successfully")
            
        except Exception as e:
            logger.error(f"Error training decision trees: {str(e)}")
            raise
    
    def _extract_features(self, training_data: List[Dict]) -> np.ndarray:
        """Extract features from training data."""
        features = []
        
        for data in training_data:
            prefs = data['preferences']
            feature_vector = [
                prefs['dimensions']['width'],
                prefs['dimensions']['length'],
                1 if prefs['work_style'] == "Individual Focus" else 0,
                1 if prefs['work_style'] == "Collaborative" else 0,
                1 if prefs['work_style'] == "Hybrid" else 0,
                1 if prefs['work_style'] == "Creative Studio" else 0,
                {"Low": 0, "Medium": 1, "High": 2}[prefs['noise_tolerance']],
                prefs['equipment']['monitors'],
                1 if prefs['equipment']['standing_desk'] else 0,
                1 if prefs['equipment']['storage'] else 0
            ]
            features.append(feature_vector)
        
        return np.array(features)
    
    def suggest_layout(self, preferences: Dict) -> Dict:
        """Generate initial layout suggestion based on decision trees."""
        try:
            # Extract features from preferences
            features = self._extract_features([{'preferences': preferences}])
            
            # Predict positions
            desk_position = self.desk_position_model.predict(features)[0]
            storage_position = self.storage_position_model.predict(features)[0]
            
            # Generate layout suggestion
            layout = {
                "desk": {
                    "position": tuple(desk_position),
                    "dimensions": (160, 80),  # Standard desk size
                    "orientation": 0  # Default orientation
                },
                "storage": {
                    "position": tuple(storage_position),
                    "dimensions": (100, 50)  # Standard storage size
                },
                "equipment_zones": {
                    "monitor_positions": [
                        (desk_position[0] + 40, desk_position[1])
                    ] * preferences['equipment']['monitors']
                },
                "spacing": {
                    "clearance": 100,  # Standard clearance
                    "walkways": 120  # Standard walkway width
                }
            }
            
            logger.info("Generated initial layout suggestion")
            return layout
            
        except Exception as e:
            logger.error(f"Error generating layout suggestion: {str(e)}")
            raise
