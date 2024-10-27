from typing import Dict, List, Optional
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
from utils.logger import setup_logger

logger = setup_logger()

class BehavioralDataProcessor:
    """Processes and analyzes user behavioral data for workspace optimization."""
    
    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.logger = setup_logger()
        self.movement_patterns = pd.DataFrame()
        self.break_patterns = pd.DataFrame()
        self.interaction_zones = pd.DataFrame()
    
    def load_movement_data(self, file_path: Optional[str] = None) -> None:
        """Load movement tracking data from file."""
        try:
            if file_path is None:
                file_path = self.data_dir / "movement_data.csv"
            
            self.movement_patterns = pd.read_csv(
                file_path,
                parse_dates=['timestamp']
            )
            
            logger.info(f"Loaded movement data: {len(self.movement_patterns)} records")
            
        except Exception as e:
            logger.error(f"Error loading movement data: {str(e)}")
            raise
    
    def load_break_data(self, file_path: Optional[str] = None) -> None:
        """Load break pattern data from file."""
        try:
            if file_path is None:
                file_path = self.data_dir / "break_data.csv"
            
            self.break_patterns = pd.read_csv(
                file_path,
                parse_dates=['start_time', 'end_time']
            )
            
            logger.info(f"Loaded break data: {len(self.break_patterns)} records")
            
        except Exception as e:
            logger.error(f"Error loading break data: {str(e)}")
            raise
    
    def analyze_movement_patterns(self) -> Dict:
        """Analyze movement patterns to identify optimal layout zones."""
        try:
            if self.movement_patterns.empty:
                raise ValueError("No movement data loaded")
            
            analysis = {
                "high_traffic_zones": self._identify_high_traffic_zones(),
                "common_paths": self._identify_common_paths(),
                "static_zones": self._identify_static_zones(),
                "interaction_zones": self._identify_interaction_zones()
            }
            
            return analysis
            
        except Exception as e:
            logger.error(f"Error analyzing movement patterns: {str(e)}")
            raise
    
    def analyze_break_patterns(self) -> Dict:
        """Analyze break patterns for workspace optimization."""
        try:
            if self.break_patterns.empty:
                raise ValueError("No break data loaded")
            
            analysis = {
                "average_break_duration": self._calculate_average_break_duration(),
                "break_frequency": self._calculate_break_frequency(),
                "peak_break_times": self._identify_peak_break_times(),
                "break_locations": self._analyze_break_locations()
            }
            
            return analysis
            
        except Exception as e:
            logger.error(f"Error analyzing break patterns: {str(e)}")
            raise
    
    def _identify_high_traffic_zones(self) -> List[Dict]:
        """Identify zones with high movement traffic."""
        zones = []
        try:
            # Group movement data by grid cells
            grid_size = 50  # cm
            self.movement_patterns['grid_x'] = (
                self.movement_patterns['x_position'] // grid_size
            )
            self.movement_patterns['grid_y'] = (
                self.movement_patterns['y_position'] // grid_size
            )
            
            traffic = self.movement_patterns.groupby(
                ['grid_x', 'grid_y']
            ).size().reset_index(name='count')
            
            # Identify high traffic zones (top 20%)
            threshold = traffic['count'].quantile(0.8)
            high_traffic = traffic[traffic['count'] >= threshold]
            
            for _, row in high_traffic.iterrows():
                zones.append({
                    "position": (
                        row['grid_x'] * grid_size,
                        row['grid_y'] * grid_size
                    ),
                    "traffic_count": row['count']
                })
            
            return zones
            
        except Exception as e:
            logger.error(f"Error identifying high traffic zones: {str(e)}")
            raise
    
    def _identify_common_paths(self) -> List[Dict]:
        """Identify commonly taken paths between points."""
        try:
            paths = []
            
            # Sort movement data by timestamp
            sorted_movements = self.movement_patterns.sort_values('timestamp')
            
            # Identify sequential movements
            for i in range(len(sorted_movements) - 1):
                start = sorted_movements.iloc[i]
                end = sorted_movements.iloc[i + 1]
                
                # If movements are within 5 seconds of each other
                if (end['timestamp'] - start['timestamp']) <= timedelta(seconds=5):
                    paths.append({
                        "start": (start['x_position'], start['y_position']),
                        "end": (end['x_position'], end['y_position']),
                        "frequency": 1
                    })
            
            # Combine similar paths
            combined_paths = self._combine_similar_paths(paths)
            
            return combined_paths
            
        except Exception as e:
            logger.error(f"Error identifying common paths: {str(e)}")
            raise
    
    def _combine_similar_paths(self, paths: List[Dict]) -> List[Dict]:
        """Combine paths that are similar in start and end points."""
        combined = {}
        threshold = 50  # cm
        
        for path in paths:
            key = (
                round(path['start'][0] / threshold) * threshold,
                round(path['start'][1] / threshold) * threshold,
                round(path['end'][0] / threshold) * threshold,
                round(path['end'][1] / threshold) * threshold
            )
            
            if key in combined:
                combined[key]['frequency'] += 1
            else:
                combined[key] = {
                    "start": (key[0], key[1]),
                    "end": (key[2], key[3]),
                    "frequency": 1
                }
        
        return list(combined.values())
    
    def generate_layout_recommendations(self) -> Dict:
        """Generate layout recommendations based on behavioral data."""
        try:
            movement_analysis = self.analyze_movement_patterns()
            break_analysis = self.analyze_break_patterns()
            
            recommendations = {
                "desk_zones": self._recommend_desk_zones(movement_analysis),
                "break_areas": self._recommend_break_areas(break_analysis),
                "storage_locations": self._recommend_storage_locations(movement_analysis),
                "traffic_considerations": movement_analysis['high_traffic_zones']
            }
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Error generating recommendations: {str(e)}")
            raise
    
    def _recommend_desk_zones(self, movement_analysis: Dict) -> List[Dict]:
        """Recommend optimal desk placement zones."""
        try:
            static_zones = movement_analysis['static_zones']
            traffic_zones = movement_analysis['high_traffic_zones']
            
            # Filter static zones that are not in high traffic areas
            desk_zones = []
            for zone in static_zones:
                if not any(self._is_nearby(zone['position'], tz['position']) 
                          for tz in traffic_zones):
                    desk_zones.append({
                        "position": zone['position'],
                        "suitability_score": zone['duration']
                    })
            
            return sorted(desk_zones, key=lambda x: x['suitability_score'], reverse=True)
            
        except Exception as e:
            logger.error(f"Error recommending desk zones: {str(e)}")
            raise
    
    def _is_nearby(self, pos1: tuple, pos2: tuple, threshold: float = 100) -> bool:
        """Check if two positions are within a threshold distance."""
        return (
            ((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2) ** 0.5
            < threshold
        )
