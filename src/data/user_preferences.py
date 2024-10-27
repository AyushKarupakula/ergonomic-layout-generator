from typing import Dict, Optional
import json
from pathlib import Path
from utils.logger import setup_logger
from datetime import datetime

logger = setup_logger()

class UserPreferences:
    """Manages user preferences for workspace layout generation."""
    
    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.preferences_file = data_dir / "preferences.json"
        self.history_file = data_dir / "preference_history.json"
        self.logger = setup_logger()
        self._ensure_files_exist()
    
    def _ensure_files_exist(self) -> None:
        """Ensure preference files exist with default structure."""
        try:
            self.data_dir.mkdir(exist_ok=True)
            
            # Create preferences file if it doesn't exist
            if not self.preferences_file.exists():
                self._save_preferences({})
            
            # Create history file if it doesn't exist
            if not self.history_file.exists():
                with open(self.history_file, 'w') as f:
                    json.dump([], f)
                    
        except Exception as e:
            logger.error(f"Error ensuring preference files: {str(e)}")
            raise
    
    def get_preferences(self, user_id: str) -> Dict:
        """Get preferences for a specific user."""
        try:
            with open(self.preferences_file, 'r') as f:
                preferences = json.load(f)
            
            return preferences.get(user_id, self._get_default_preferences())
            
        except Exception as e:
            logger.error(f"Error getting preferences: {str(e)}")
            raise
    
    def save_preferences(self, user_id: str, preferences: Dict) -> None:
        """Save preferences for a specific user."""
        try:
            # Validate preferences
            self._validate_preferences(preferences)
            
            # Load existing preferences
            with open(self.preferences_file, 'r') as f:
                all_preferences = json.load(f)
            
            # Update preferences
            all_preferences[user_id] = preferences
            
            # Save updated preferences
            self._save_preferences(all_preferences)
            
            # Add to history
            self._add_to_history(user_id, preferences)
            
            logger.info(f"Saved preferences for user {user_id}")
            
        except Exception as e:
            logger.error(f"Error saving preferences: {str(e)}")
            raise
    
    def _save_preferences(self, preferences: Dict) -> None:
        """Save preferences to file."""
        with open(self.preferences_file, 'w') as f:
            json.dump(preferences, f, indent=4)
    
    def _add_to_history(self, user_id: str, preferences: Dict) -> None:
        """Add preferences to history with timestamp."""
        try:
            with open(self.history_file, 'r') as f:
                history = json.load(f)
            
            history.append({
                "user_id": user_id,
                "preferences": preferences,
                "timestamp": datetime.now().isoformat()
            })
            
            # Keep only last 10 entries per user
            history = self._trim_history(history, user_id)
            
            with open(self.history_file, 'w') as f:
                json.dump(history, f, indent=4)
                
        except Exception as e:
            logger.error(f"Error adding to history: {str(e)}")
            raise
    
    def _trim_history(self, history: list, user_id: str, max_entries: int = 10) -> list:
        """Keep only the most recent entries for a user."""
        user_entries = [h for h in history if h['user_id'] != user_id]
        recent_entries = sorted(
            [h for h in history if h['user_id'] == user_id],
            key=lambda x: x['timestamp'],
            reverse=True
        )[:max_entries]
        
        return user_entries + recent_entries
    
    def _get_default_preferences(self) -> Dict:
        """Return default preferences structure."""
        return {
            "dimensions": {
                "width": 5000,  # mm
                "length": 5000  # mm
            },
            "work_style": "Individual Focus",
            "noise_tolerance": "Medium",
            "equipment": {
                "monitors": 2,
                "standing_desk": False,
                "storage": True
            },
            "accessibility": {
                "wheelchair_accessible": False,
                "left_handed": False
            },
            "environmental": {
                "natural_light": True,
                "ventilation": "Standard"
            }
        }
    
    def _validate_preferences(self, preferences: Dict) -> None:
        """Validate preference structure and values."""
        required_fields = {
            "dimensions": ["width", "length"],
            "work_style": ["Individual Focus", "Collaborative", "Hybrid", "Creative Studio"],
            "noise_tolerance": ["Low", "Medium", "High"],
            "equipment": ["monitors", "standing_desk", "storage"]
        }
        
        # Check required fields
        for field, subfields in required_fields.items():
            if field not in preferences:
                raise ValueError(f"Missing required field: {field}")
            
            if isinstance(subfields, list) and not isinstance(preferences[field], dict):
                if field == "work_style":
                    if preferences[field] not in subfields:
                        raise ValueError(f"Invalid {field}: {preferences[field]}")
                elif field == "noise_tolerance":
                    if preferences[field] not in subfields:
                        raise ValueError(f"Invalid {field}: {preferences[field]}")
            else:
                for subfield in subfields:
                    if subfield not in preferences[field]:
                        raise ValueError(f"Missing subfield: {subfield} in {field}")
        
        # Validate dimensions
        for dim in ["width", "length"]:
            value = preferences["dimensions"][dim]
            if not isinstance(value, (int, float)) or value <= 0:
                raise ValueError(f"Invalid dimension {dim}: {value}")
        
        # Validate equipment
        if not isinstance(preferences["equipment"]["monitors"], int):
            raise ValueError("Monitors must be an integer")
        if not isinstance(preferences["equipment"]["standing_desk"], bool):
            raise ValueError("Standing desk must be a boolean")
        if not isinstance(preferences["equipment"]["storage"], bool):
            raise ValueError("Storage must be a boolean")
