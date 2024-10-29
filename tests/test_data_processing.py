import pytest
from pathlib import Path
import json
import numpy as np
from src.data.data_processing import DataProcessor
from src.data.user_preferences import UserPreferences

@pytest.fixture
def temp_data_dir(tmp_path):
    """Create a temporary directory for test data."""
    return tmp_path

@pytest.fixture
def sample_training_data():
    return [
        {
            "preferences": {
                "dimensions": {
                    "width": 5000,
                    "length": 4000
                },
                "work_style": "Individual Focus",
                "noise_tolerance": "Medium",
                "equipment": {
                    "monitors": 2,
                    "standing_desk": True,
                    "storage": True
                }
            },
            "layout": {
                "desk": {
                    "position": (2000, 1500),
                    "dimensions": (160, 80),
                    "orientation": 0
                },
                "storage": {
                    "position": (2500, 1500),
                    "dimensions": (100, 50)
                },
                "equipment_zones": {
                    "monitor_positions": [
                        (2040, 1500),
                        (2120, 1500)
                    ]
                },
                "spacing": {
                    "clearance": 100,
                    "walkways": 120
                }
            }
        }
    ]

class TestDataProcessor:
    def test_initialization(self, temp_data_dir):
        processor = DataProcessor(temp_data_dir)
        assert processor.data_dir == temp_data_dir
    
    def test_validate_and_process_item_valid(self, sample_training_data):
        processor = DataProcessor(Path())
        processed = processor._validate_and_process_item(sample_training_data[0])
        assert processed is not None
        assert "preferences" in processed
        assert "layout" in processed
    
    def test_validate_and_process_item_invalid(self):
        processor = DataProcessor(Path())
        invalid_item = {
            "preferences": {},  # Missing required fields
            "layout": {}
        }
        processed = processor._validate_and_process_item(invalid_item)
        assert processed is None
    
    def test_process_preferences_valid(self, sample_training_data):
        processor = DataProcessor(Path())
        preferences = processor._process_preferences(sample_training_data[0]["preferences"])
        assert isinstance(preferences["dimensions"]["width"], float)
        assert isinstance(preferences["dimensions"]["length"], float)
    
    def test_process_preferences_invalid_dimensions(self):
        processor = DataProcessor(Path())
        invalid_preferences = {
            "dimensions": {
                "width": -100,  # Invalid negative dimension
                "length": 4000
            },
            "work_style": "Individual Focus",
            "noise_tolerance": "Medium",
            "equipment": {
                "monitors": 2,
                "standing_desk": True,
                "storage": True
            }
        }
        with pytest.raises(ValueError):
            processor._process_preferences(invalid_preferences)
    
    def test_save_generated_layout(self, temp_data_dir, sample_training_data):
        processor = DataProcessor(temp_data_dir)
        output_path = temp_data_dir / "test_layout.json"
        
        processor.save_generated_layout(
            sample_training_data[0]["layout"],
            output_path
        )
        
        assert output_path.exists()
        with open(output_path) as f:
            saved_layout = json.load(f)
        assert saved_layout["desk"]["dimensions"] == [160, 80]

class TestUserPreferences:
    def test_initialization(self, temp_data_dir):
        prefs = UserPreferences(temp_data_dir)
        assert prefs.preferences_file.parent == temp_data_dir
        assert prefs.history_file.parent == temp_data_dir
    
    def test_ensure_files_exist(self, temp_data_dir):
        prefs = UserPreferences(temp_data_dir)
        prefs._ensure_files_exist()
        
        assert prefs.preferences_file.exists()
        assert prefs.history_file.exists()
    
    def test_get_preferences_new_user(self, temp_data_dir):
        prefs = UserPreferences(temp_data_dir)
        user_prefs = prefs.get_preferences("new_user")
        
        assert isinstance(user_prefs, dict)
        assert "dimensions" in user_prefs
        assert "work_style" in user_prefs
        assert "equipment" in user_prefs
    
    def test_save_preferences_valid(self, temp_data_dir):
        prefs = UserPreferences(temp_data_dir)
        valid_preferences = {
            "dimensions": {
                "width": 5000,
                "length": 4000
            },
            "work_style": "Individual Focus",
            "noise_tolerance": "Medium",
            "equipment": {
                "monitors": 2,
                "standing_desk": True,
                "storage": True
            }
        }
        
        prefs.save_preferences("test_user", valid_preferences)
        
        # Verify saved preferences
        saved_prefs = prefs.get_preferences("test_user")
        assert saved_prefs == valid_preferences
    
    def test_save_preferences_invalid(self, temp_data_dir):
        prefs = UserPreferences(temp_data_dir)
        invalid_preferences = {
            "dimensions": {
                "width": -5000,  # Invalid negative dimension
                "length": 4000
            },
            "work_style": "Invalid Style",  # Invalid work style
            "noise_tolerance": "Medium",
            "equipment": {
                "monitors": 2,
                "standing_desk": True,
                "storage": True
            }
        }
        
        with pytest.raises(ValueError):
            prefs.save_preferences("test_user", invalid_preferences)
    
    def test_preference_history(self, temp_data_dir):
        prefs = UserPreferences(temp_data_dir)
        valid_preferences = {
            "dimensions": {
                "width": 5000,
                "length": 4000
            },
            "work_style": "Individual Focus",
            "noise_tolerance": "Medium",
            "equipment": {
                "monitors": 2,
                "standing_desk": True,
                "storage": True
            }
        }
        
        # Save preferences multiple times
        for i in range(12):  # More than max_entries (10)
            prefs.save_preferences("test_user", valid_preferences)
        
        # Check history file
        with open(prefs.history_file) as f:
            history = json.load(f)
        
        # Count entries for test_user
        test_user_entries = [h for h in history if h["user_id"] == "test_user"]
        assert len(test_user_entries) == 10  # Should be trimmed to max_entries 