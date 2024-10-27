import requests
from typing import Dict, List, Optional
import json
from pathlib import Path
from utils.logger import setup_logger

logger = setup_logger()

class ErgonomicsAPI:
    """Interface for accessing ergonomic standards and guidelines."""
    
    def __init__(self, api_key: str, base_url: str = "https://api.ergonomics.example.com/v1"):
        self.api_key = api_key
        self.base_url = base_url
        self.logger = setup_logger()
        self.cache_file = Path(__file__).parent / "cache" / "ergonomics_cache.json"
        self.cache_file.parent.mkdir(exist_ok=True)
        self._load_cache()
    
    def _load_cache(self) -> None:
        """Load cached ergonomics data."""
        try:
            if self.cache_file.exists():
                with open(self.cache_file, 'r') as f:
                    self.cache = json.load(f)
            else:
                self.cache = {}
                
        except Exception as e:
            self.logger.error(f"Error loading cache: {str(e)}")
            self.cache = {}
    
    def _save_cache(self) -> None:
        """Save ergonomics data to cache."""
        try:
            with open(self.cache_file, 'w') as f:
                json.dump(self.cache, f, indent=4)
                
        except Exception as e:
            self.logger.error(f"Error saving cache: {str(e)}")
    
    def get_workspace_guidelines(self, work_style: str) -> Dict:
        """Get ergonomic guidelines based on work style."""
        try:
            # Check cache first
            cache_key = f"guidelines_{work_style}"
            if cache_key in self.cache:
                return self.cache[cache_key]
            
            # Make API request
            response = requests.get(
                f"{self.base_url}/guidelines",
                params={"work_style": work_style},
                headers={"Authorization": f"Bearer {self.api_key}"}
            )
            response.raise_for_status()
            
            guidelines = response.json()
            
            # Cache the results
            self.cache[cache_key] = guidelines
            self._save_cache()
            
            return guidelines
            
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error fetching guidelines: {str(e)}")
            raise
    
    def validate_layout(self, layout: Dict, work_style: str) -> Dict:
        """Validate layout against ergonomic standards."""
        try:
            response = requests.post(
                f"{self.base_url}/validate",
                json={
                    "layout": layout,
                    "work_style": work_style
                },
                headers={"Authorization": f"Bearer {self.api_key}"}
            )
            response.raise_for_status()
            
            return response.json()
            
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error validating layout: {str(e)}")
            raise
    
    def get_equipment_recommendations(self, preferences: Dict) -> Dict:
        """Get equipment recommendations based on user preferences."""
        try:
            response = requests.post(
                f"{self.base_url}/recommendations/equipment",
                json=preferences,
                headers={"Authorization": f"Bearer {self.api_key}"}
            )
            response.raise_for_status()
            
            return response.json()
            
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error fetching recommendations: {str(e)}")
            raise
    
    def get_ergonomic_scores(self, layout: Dict) -> Dict:
        """Calculate ergonomic scores for a layout."""
        try:
            response = requests.post(
                f"{self.base_url}/scores",
                json=layout,
                headers={"Authorization": f"Bearer {self.api_key}"}
            )
            response.raise_for_status()
            
            return response.json()
            
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error calculating scores: {str(e)}")
            raise
