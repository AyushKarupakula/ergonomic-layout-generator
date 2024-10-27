import numpy as np
from typing import Dict, List, Tuple
import tensorflow as tf
from utils.logger import setup_logger

logger = setup_logger()

class LayoutOptimizer:
    """Reinforcement learning-based layout optimizer."""
    
    def __init__(self, state_size: int = 10, action_size: int = 8):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = []
        self.gamma = 0.95  # Discount factor
        self.epsilon = 1.0  # Exploration rate
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.model = self._build_model()
        self.logger = setup_logger()
        
    def _build_model(self) -> tf.keras.Model:
        """Build the deep Q-learning network."""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(24, input_dim=self.state_size, activation='relu'),
            tf.keras.layers.Dense(24, activation='relu'),
            tf.keras.layers.Dense(self.action_size, activation='linear')
        ])
        model.compile(loss='mse', optimizer=tf.keras.optimizers.Adam(learning_rate=0.001))
        return model
    
    def optimize_layout(self, initial_layout: Dict, preferences: Dict, 
                       iterations: int = 100) -> Dict:
        """Optimize layout using reinforcement learning."""
        try:
            current_layout = initial_layout.copy()
            current_state = self._get_state(current_layout, preferences)
            
            for i in range(iterations):
                # Choose action
                if np.random.rand() <= self.epsilon:
                    action = np.random.randint(self.action_size)
                else:
                    action = np.argmax(self.model.predict(
                        current_state.reshape(1, -1), verbose=0
                    )[0])
                
                # Apply action and get new state
                new_layout = self._apply_action(current_layout, action)
                new_state = self._get_state(new_layout, preferences)
                
                # Calculate reward
                reward = self._calculate_reward(new_layout, preferences)
                
                # Store experience
                self.memory.append((
                    current_state, action, reward, 
                    new_state, i == iterations-1
                ))
                
                # Update current state and layout
                current_state = new_state
                current_layout = new_layout
                
                # Train model
                self._train()
                
                # Update exploration rate
                if self.epsilon > self.epsilon_min:
                    self.epsilon *= self.epsilon_decay
            
            logger.info("Layout optimization completed")
            return current_layout
            
        except Exception as e:
            logger.error(f"Error optimizing layout: {str(e)}")
            raise
    
    def _get_state(self, layout: Dict, preferences: Dict) -> np.ndarray:
        """Convert layout and preferences to state vector."""
        state = []
        
        # Layout parameters
        state.extend([
            *layout['desk']['position'],
            *layout['storage']['position'],
            layout['desk']['orientation'] / 360,
            layout['spacing']['clearance'] / 200,
            layout['spacing']['walkways'] / 200
        ])
        
        # Preference parameters
        state.extend([
            preferences['dimensions']['width'] / 1000,
            preferences['dimensions']['length'] / 1000,
            {"Low": 0, "Medium": 0.5, "High": 1}[preferences['noise_tolerance']]
        ])
        
        return np.array(state)
    
    def _apply_action(self, layout: Dict, action: int) -> Dict:
        """Apply selected action to modify layout."""
        new_layout = layout.copy()
        
        # Define possible actions
        actions = {
            0: lambda: self._move_desk(new_layout, dx=50),
            1: lambda: self._move_desk(new_layout, dx=-50),
            2: lambda: self._move_desk(new_layout, dy=50),
            3: lambda: self._move_desk(new_layout, dy=-50),
            4: lambda: self._rotate_desk(new_layout, angle=45),
            5: lambda: self._move_storage(new_layout, dx=50),
            6: lambda: self._move_storage(new_layout, dy=50),
            7: lambda: self._adjust_spacing(new_layout, factor=1.1)
        }
        
        # Apply selected action
        actions[action]()
        return new_layout
    
    def _calculate_reward(self, layout: Dict, preferences: Dict) -> float:
        """Calculate reward based on layout quality."""
        reward = 0
        
        # Distance between desk and storage
        desk_pos = np.array(layout['desk']['position'])
        storage_pos = np.array(layout['storage']['position'])
        distance = np.linalg.norm(desk_pos - storage_pos)
        
        # Penalize if too close or too far
        optimal_distance = 200
        reward -= abs(distance - optimal_distance) / 100
        
        # Reward for good spacing
        if layout['spacing']['clearance'] >= 100:
            reward += 10
        
        # Penalize if too close to walls
        room_width = preferences['dimensions']['width']
        room_length = preferences['dimensions']['length']
        
        min_wall_distance = 50
        if (min(desk_pos) < min_wall_distance or 
            desk_pos[0] > room_width - min_wall_distance or 
            desk_pos[1] > room_length - min_wall_distance):
            reward -= 20
        
        return reward
    
    def _train(self, batch_size: int = 32) -> None:
        """Train the model on stored experiences."""
        if len(self.memory) < batch_size:
            return
            
        # Sample batch from memory
        batch = np.random.choice(len(self.memory), batch_size, replace=False)
        states = []
        targets = []
        
        for i in batch:
            state, action, reward, next_state, done = self.memory[i]
            target = reward
            
            if not done:
                target += self.gamma * np.amax(
                    self.model.predict(next_state.reshape(1, -1), verbose=0)[0]
                )
            
            target_f = self.model.predict(state.reshape(1, -1), verbose=0)
            target_f[0][action] = target
            
            states.append(state)
            targets.append(target_f[0])
        
        self.model.fit(
            np.array(states), np.array(targets), 
            epochs=1, verbose=0
        )
    
    def _move_desk(self, layout: Dict, dx: float = 0, dy: float = 0) -> None:
        """Move desk position."""
        layout['desk']['position'] = (
            layout['desk']['position'][0] + dx,
            layout['desk']['position'][1] + dy
        )
    
    def _rotate_desk(self, layout: Dict, angle: float) -> None:
        """Rotate desk orientation."""
        layout['desk']['orientation'] = (
            layout['desk']['orientation'] + angle
        ) % 360
    
    def _move_storage(self, layout: Dict, dx: float = 0, dy: float = 0) -> None:
        """Move storage position."""
        layout['storage']['position'] = (
            layout['storage']['position'][0] + dx,
            layout['storage']['position'][1] + dy
        )
    
    def _adjust_spacing(self, layout: Dict, factor: float) -> None:
        """Adjust spacing parameters."""
        layout['spacing']['clearance'] *= factor
        layout['spacing']['walkways'] *= factor
