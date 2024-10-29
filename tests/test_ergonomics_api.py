import pytest
import json
import requests
from unittest.mock import Mock, patch
from pathlib import Path
from src.data.ergonomics_api import ErgonomicsAPI

@pytest.fixture
def mock_api_response():
    return {
        "guidelines": {
            "desk_height": {
                "min": 650,
                "max": 750,
                "optimal": 720
            },
            "monitor_distance": {
                "min": 500,
                "max": 750,
                "optimal": 600
            },
            "lighting": {
                "min_lux": 300,
                "max_lux": 500
            }
        }
    }

@pytest.fixture
def ergonomics_api():
    return ErgonomicsAPI(
        api_key="test_key",
        base_url="https://api.test.example.com/v1"
    )

class TestErgonomicsAPI:
    def test_initialization(self):
        api = ErgonomicsAPI("test_key")
        assert api.api_key == "test_key"
        assert isinstance(api.cache, dict)
    
    @patch('requests.get')
    def test_get_workspace_guidelines(self, mock_get, ergonomics_api, mock_api_response):
        # Setup mock response
        mock_response = Mock()
        mock_response.json.return_value = mock_api_response
        mock_response.raise_for_status.return_value = None
        mock_get.return_value = mock_response
        
        # Test API call
        guidelines = ergonomics_api.get_workspace_guidelines("Individual Focus")
        
        # Verify request
        mock_get.assert_called_once_with(
            f"{ergonomics_api.base_url}/guidelines",
            params={"work_style": "Individual Focus"},
            headers={"Authorization": "Bearer test_key"}
        )
        
        # Verify response
        assert guidelines == mock_api_response
        
        # Test caching
        cached_guidelines = ergonomics_api.get_workspace_guidelines("Individual Focus")
        assert mock_get.call_count == 1  # Should use cached value
    
    @patch('requests.post')
    def test_validate_layout(self, mock_post, ergonomics_api):
        test_layout = {
            "desk": {
                "position": (2000, 1500),
                "dimensions": (160, 80)
            }
        }
        
        mock_response = Mock()
        mock_response.json.return_value = {"valid": True, "issues": []}
        mock_response.raise_for_status.return_value = None
        mock_post.return_value = mock_response
        
        validation = ergonomics_api.validate_layout(test_layout, "Individual Focus")
        
        assert validation["valid"] is True
        mock_post.assert_called_once()
    
    @patch('requests.post')
    def test_get_equipment_recommendations(self, mock_post, ergonomics_api):
        test_preferences = {
            "work_style": "Individual Focus",
            "dimensions": {"width": 5000, "length": 4000}
        }
        
        mock_response = Mock()
        mock_response.json.return_value = {
            "recommended_equipment": ["standing_desk", "ergonomic_chair"]
        }
        mock_response.raise_for_status.return_value = None
        mock_post.return_value = mock_response
        
        recommendations = ergonomics_api.get_equipment_recommendations(test_preferences)
        
        assert "recommended_equipment" in recommendations
        mock_post.assert_called_once()
    
    def test_cache_management(self, ergonomics_api, tmp_path):
        # Test cache saving
        ergonomics_api.cache = {"test_key": "test_value"}
        ergonomics_api.cache_file = tmp_path / "test_cache.json"
        ergonomics_api._save_cache()
        
        assert ergonomics_api.cache_file.exists()
        
        # Test cache loading
        new_api = ErgonomicsAPI("test_key")
        new_api.cache_file = tmp_path / "test_cache.json"
        new_api._load_cache()
        
        assert "test_key" in new_api.cache
        assert new_api.cache["test_key"] == "test_value"
    
    @patch('requests.get')
    def test_api_error_handling(self, mock_get, ergonomics_api):
        mock_get.side_effect = requests.exceptions.RequestException("API Error")
        
        with pytest.raises(requests.exceptions.RequestException):
            ergonomics_api.get_workspace_guidelines("Individual Focus") 