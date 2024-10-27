import pytest
import numpy as np
from src.ai.models import WorkspaceLayoutGenerator
from src.ai.decision_tree import LayoutDecisionTree
from src.ai.reinforcement_learning import LayoutOptimizer

@pytest.fixture
def sample_preferences():
    return {
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

@pytest.fixture
def sample_layout():
    return {
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

class TestWorkspaceLayoutGenerator:
    def test_initialization(self):
        generator = WorkspaceLayoutGenerator()
        assert generator.model is not None
    
    def test_preprocess_preferences(self, sample_preferences):
        generator = WorkspaceLayoutGenerator()
        features = generator._preprocess_preferences(sample_preferences)
        assert features.shape == (1, 10)
        assert 0 <= features.max() <= 1  # Check normalization
    
    def test_generate_layout(self, sample_preferences):
        generator = WorkspaceLayoutGenerator()
        layout = generator.generate_layout(sample_preferences)
        
        # Check required fields
        assert "desk" in layout
        assert "storage" in layout
        assert "equipment_zones" in layout
        assert "spacing" in layout
        
        # Check position ranges
        assert 0 <= layout["desk"]["position"][0] <= sample_preferences["dimensions"]["width"]
        assert 0 <= layout["desk"]["position"][1] <= sample_preferences["dimensions"]["length"]

class TestLayoutDecisionTree:
    def test_initialization(self):
        tree = LayoutDecisionTree()
        assert tree.desk_position_model is not None
        assert tree.storage_position_model is not None
    
    def test_extract_features(self, sample_preferences):
        tree = LayoutDecisionTree()
        features = tree._extract_features([{"preferences": sample_preferences}])
        assert features.shape == (1, 10)
    
    def test_suggest_layout(self, sample_preferences):
        tree = LayoutDecisionTree()
        layout = tree.suggest_layout(sample_preferences)
        
        # Check basic structure
        assert isinstance(layout, dict)
        assert all(key in layout for key in ["desk", "storage", "equipment_zones", "spacing"])
        
        # Check dimensions
        assert len(layout["desk"]["dimensions"]) == 2
        assert len(layout["storage"]["dimensions"]) == 2

class TestLayoutOptimizer:
    def test_initialization(self):
        optimizer = LayoutOptimizer()
        assert optimizer.model is not None
        assert 0 < optimizer.epsilon <= 1
    
    def test_get_state(self, sample_layout, sample_preferences):
        optimizer = LayoutOptimizer()
        state = optimizer._get_state(sample_layout, sample_preferences)
        assert isinstance(state, np.ndarray)
        assert len(state) == optimizer.state_size
    
    def test_calculate_reward(self, sample_layout, sample_preferences):
        optimizer = LayoutOptimizer()
        reward = optimizer._calculate_reward(sample_layout, sample_preferences)
        assert isinstance(reward, float)
    
    def test_optimize_layout(self, sample_layout, sample_preferences):
        optimizer = LayoutOptimizer()
        optimized_layout = optimizer.optimize_layout(sample_layout, sample_preferences)
        
        # Check that optimization maintains layout structure
        assert all(key in optimized_layout for key in sample_layout.keys())
        assert all(key in optimized_layout["desk"] for key in sample_layout["desk"].keys())
