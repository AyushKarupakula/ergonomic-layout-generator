from abc import ABC, abstractmethod
import numpy as np
import tensorflow as tf
from typing import Dict, List, Tuple
from utils.logger import setup_logger

logger = setup_logger()

class BaseLayoutModel(ABC):
    """Abstract base class for layout generation models."""
    
    @abstractmethod
    def generate_layout(self, preferences: Dict) -> Dict:
        """Generate a layout based on user preferences."""
        pass
    
    @abstractmethod
    def train(self, training_data: List[Dict]) -> None:
        """Train the model using historical data."""
        pass

class WorkspaceLayoutGenerator(BaseLayoutModel):
    """Neural network-based workspace layout generator."""
    
    def __init__(self):
        self.model = self._build_model()
        
    def _build_model(self) -> tf.keras.Model:
        """Build the neural network architecture."""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu', input_shape=(10,)),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(256, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(512, activation='relu'),
            tf.keras.layers.Dense(50, activation='sigmoid')  # Output layout parameters
        ])
        
        model.compile(
            optimizer='adam',
            loss='mse',
            metrics=['mae']
        )
        
        return model
    
    def _preprocess_preferences(self, preferences: Dict) -> np.ndarray:
        """Convert user preferences to model input format."""
        # Extract and normalize features
        features = []
        
        # Room dimensions (normalized to 0-1 range)
        features.extend([
            preferences['dimensions']['width'] / 10000,
            preferences['dimensions']['length'] / 10000
        ])
        
        # Work style (one-hot encoding)
        work_styles = ["Individual Focus", "Collaborative", "Hybrid", "Creative Studio"]
        features.extend([
            1 if preferences['work_style'] == style else 0
            for style in work_styles
        ])
        
        # Noise tolerance
        noise_levels = {"Low": 0, "Medium": 0.5, "High": 1}
        features.append(noise_levels[preferences['noise_tolerance']])
        
        # Equipment
        features.extend([
            preferences['equipment']['monitors'] / 4,  # Normalize by max monitors
            1 if preferences['equipment']['standing_desk'] else 0,
            1 if preferences['equipment']['storage'] else 0
        ])
        
        return np.array(features).reshape(1, -1)
    
    def generate_layout(self, preferences: Dict) -> Dict:
        """Generate a workspace layout based on user preferences."""
        try:
            # Preprocess input
            model_input = self._preprocess_preferences(preferences)
            
            # Generate layout parameters
            layout_params = self.model.predict(model_input)[0]
            
            # Convert parameters to layout specification
            layout = self._params_to_layout(layout_params)
            
            logger.info("Successfully generated layout")
            return layout
            
        except Exception as e:
            logger.error(f"Error generating layout: {str(e)}")
            raise
    
    def _params_to_layout(self, params: np.ndarray) -> Dict:
        """Convert model output parameters to a layout specification."""
        # Split parameters into different components
        desk_params = params[:10]
        storage_params = params[10:20]
        equipment_params = params[20:30]
        spacing_params = params[30:40]
        orientation_params = params[40:]
        
        return {
            "desk": {
                "position": (desk_params[0], desk_params[1]),
                "dimensions": (desk_params[2], desk_params[3]),
                "orientation": desk_params[4] * 360  # Convert to degrees
            },
            "storage": {
                "position": (storage_params[0], storage_params[1]),
                "dimensions": (storage_params[2], storage_params[3])
            },
            "equipment_zones": {
                "monitor_positions": [
                    (equipment_params[i], equipment_params[i+1])
                    for i in range(0, 8, 2)
                ]
            },
            "spacing": {
                "clearance": spacing_params[0] * 2,  # Convert to meters
                "walkways": spacing_params[1] * 2
            }
        }
    
    def train(self, training_data: List[Dict]) -> None:
        """Train the model using historical layout data."""
        try:
            # Prepare training data
            X = np.array([
                self._preprocess_preferences(data['preferences']).flatten()
                for data in training_data
            ])
            
            y = np.array([
                self._layout_to_params(data['layout'])
                for data in training_data
            ])
            
            # Train the model
            history = self.model.fit(
                X, y,
                epochs=100,
                batch_size=32,
                validation_split=0.2,
                verbose=1
            )
            
            logger.info("Model training completed successfully")
            return history
            
        except Exception as e:
            logger.error(f"Error training model: {str(e)}")
            raise
    
    def _layout_to_params(self, layout: Dict) -> np.ndarray:
        """Convert a layout specification to model output parameters."""
        params = []
        
        # Desk parameters
        params.extend([
            *layout['desk']['position'],
            *layout['desk']['dimensions'],
            layout['desk']['orientation'] / 360
        ])
        
        # Storage parameters
        params.extend([
            *layout['storage']['position'],
            *layout['storage']['dimensions']
        ])
        
        # Equipment parameters
        for pos in layout['equipment_zones']['monitor_positions']:
            params.extend(pos)
        
        # Spacing parameters
        params.extend([
            layout['spacing']['clearance'] / 2,
            layout['spacing']['walkways'] / 2
        ])
        
        return np.array(params)
