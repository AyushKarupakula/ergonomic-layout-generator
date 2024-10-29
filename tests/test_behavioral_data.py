import pytest
import pandas as pd
import numpy as np
from pathlib import Path
from datetime import datetime, timedelta
from src.data.behavioral_data import BehavioralDataProcessor

@pytest.fixture
def sample_movement_data():
    return pd.DataFrame({
        'timestamp': pd.date_range(start='2024-01-01', periods=100, freq='1min'),
        'x_position': np.random.uniform(0, 5000, 100),
        'y_position': np.random.uniform(0, 4000, 100),
        'activity_type': np.random.choice(['moving', 'stationary'], 100)
    })

@pytest.fixture
def sample_break_data():
    return pd.DataFrame({
        'start_time': pd.date_range(start='2024-01-01', periods=10, freq='2H'),
        'end_time': pd.date_range(start='2024-01-01 00:15:00', periods=10, freq='2H'),
        'break_type': np.random.choice(['coffee', 'lunch', 'stretch'], 10)
    })

@pytest.fixture
def behavioral_processor(tmp_path):
    return BehavioralDataProcessor(tmp_path)

class TestBehavioralDataProcessor:
    def test_initialization(self, tmp_path):
        processor = BehavioralDataProcessor(tmp_path)
        assert processor.data_dir == tmp_path
        assert processor.movement_patterns.empty
        assert processor.break_patterns.empty
    
    def test_load_movement_data(self, behavioral_processor, sample_movement_data, tmp_path):
        # Save sample data to file
        data_file = tmp_path / "movement_data.csv"
        sample_movement_data.to_csv(data_file, index=False)
        
        # Load data
        behavioral_processor.load_movement_data(data_file)
        
        assert not behavioral_processor.movement_patterns.empty
        assert len(behavioral_processor.movement_patterns) == len(sample_movement_data)
        assert all(col in behavioral_processor.movement_patterns.columns 
                  for col in ['timestamp', 'x_position', 'y_position'])
    
    def test_load_break_data(self, behavioral_processor, sample_break_data, tmp_path):
        # Save sample data to file
        data_file = tmp_path / "break_data.csv"
        sample_break_data.to_csv(data_file, index=False)
        
        # Load data
        behavioral_processor.load_break_data(data_file)
        
        assert not behavioral_processor.break_patterns.empty
        assert len(behavioral_processor.break_patterns) == len(sample_break_data)
        assert all(col in behavioral_processor.break_patterns.columns 
                  for col in ['start_time', 'end_time', 'break_type'])
    
    def test_identify_high_traffic_zones(self, behavioral_processor, sample_movement_data):
        behavioral_processor.movement_patterns = sample_movement_data
        zones = behavioral_processor._identify_high_traffic_zones()
        
        assert isinstance(zones, list)
        assert all(isinstance(zone, dict) for zone in zones)
        assert all('position' in zone and 'traffic_count' in zone for zone in zones)
    
    def test_identify_common_paths(self, behavioral_processor, sample_movement_data):
        behavioral_processor.movement_patterns = sample_movement_data
        paths = behavioral_processor._identify_common_paths()
        
        assert isinstance(paths, list)
        assert all(isinstance(path, dict) for path in paths)
        assert all('start' in path and 'end' in path for path in paths)
    
    def test_combine_similar_paths(self, behavioral_processor):
        test_paths = [
            {"start": (100, 100), "end": (200, 200), "frequency": 1},
            {"start": (102, 98), "end": (198, 202), "frequency": 1},  # Similar to first path
            {"start": (500, 500), "end": (600, 600), "frequency": 1}  # Different path
        ]
        
        combined = behavioral_processor._combine_similar_paths(test_paths)
        
        assert len(combined) < len(test_paths)  # Should combine similar paths
        assert any(path['frequency'] > 1 for path in combined)  # Should increment frequency
    
    def test_generate_layout_recommendations(self, behavioral_processor, sample_movement_data):
        behavioral_processor.movement_patterns = sample_movement_data
        recommendations = behavioral_processor.generate_layout_recommendations()
        
        assert isinstance(recommendations, dict)
        assert all(key in recommendations for key in [
            'desk_zones', 'break_areas', 'storage_locations', 'traffic_considerations'
        ])
    
    def test_is_nearby(self, behavioral_processor):
        pos1 = (100, 100)
        pos2 = (150, 150)
        pos3 = (500, 500)
        
        assert behavioral_processor._is_nearby(pos1, pos2, threshold=100)
        assert not behavioral_processor._is_nearby(pos1, pos3, threshold=100) 