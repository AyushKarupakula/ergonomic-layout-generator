import os
import json
from pathlib import Path

class Config:
    def __init__(self):
        self.base_dir = Path(__file__).parent.parent
        self.data_dir = self.base_dir / "data"
        self.models_dir = self.base_dir / "models"
        self.output_dir = self.base_dir / "output"
        
        # Create directories if they don't exist
        for directory in [self.data_dir, self.models_dir, self.output_dir]:
            directory.mkdir(exist_ok=True)
            
        # Default configuration values
        self.default_config = {
            "api_key": "",
            "rhino_path": "",
            "revit_path": "",
            "debug_mode": False,
        }
        
    def load_config(self):
        config_path = self.base_dir / "config.json"
        if config_path.exists():
            with open(config_path) as f:
                return json.load(f)
        return self.default_config
    
    def save_config(self, config_data):
        config_path = self.base_dir / "config.json"
        with open(config_path, "w") as f:
            json.dump(config_data, f, indent=4)

def load_config():
    config = Config()
    return config.load_config()
