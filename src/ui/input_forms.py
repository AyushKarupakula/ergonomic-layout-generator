from PyQt5.QtWidgets import (
    QWidget, QFormLayout, QLineEdit, QSpinBox,
    QComboBox, QCheckBox, QGroupBox, QVBoxLayout
)

class PreferencesForm(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()
        
    def init_ui(self):
        """Initialize the preferences form UI."""
        layout = QVBoxLayout(self)
        
        # Workspace Dimensions
        dimensions_group = QGroupBox("Workspace Dimensions")
        dimensions_layout = QFormLayout()
        
        self.room_width = QSpinBox()
        self.room_width.setRange(100, 10000)  # in centimeters
        self.room_width.setValue(500)
        
        self.room_length = QSpinBox()
        self.room_length.setRange(100, 10000)
        self.room_length.setValue(500)
        
        dimensions_layout.addRow("Width (cm):", self.room_width)
        dimensions_layout.addRow("Length (cm):", self.room_length)
        dimensions_group.setLayout(dimensions_layout)
        layout.addWidget(dimensions_group)
        
        # Work Style Preferences
        work_style_group = QGroupBox("Work Style")
        work_style_layout = QFormLayout()
        
        self.work_style = QComboBox()
        self.work_style.addItems([
            "Individual Focus",
            "Collaborative",
            "Hybrid",
            "Creative Studio"
        ])
        
        self.noise_tolerance = QComboBox()
        self.noise_tolerance.addItems([
            "Low",
            "Medium",
            "High"
        ])
        
        work_style_layout.addRow("Primary Work Style:", self.work_style)
        work_style_layout.addRow("Noise Tolerance:", self.noise_tolerance)
        work_style_group.setLayout(work_style_layout)
        layout.addWidget(work_style_group)
        
        # Equipment Preferences
        equipment_group = QGroupBox("Equipment")
        equipment_layout = QFormLayout()
        
        self.monitors = QSpinBox()
        self.monitors.setRange(1, 4)
        
        self.standing_desk = QCheckBox()
        self.storage = QCheckBox()
        
        equipment_layout.addRow("Number of Monitors:", self.monitors)
        equipment_layout.addRow("Standing Desk:", self.standing_desk)
        equipment_layout.addRow("Storage Unit:", self.storage)
        equipment_group.setLayout(equipment_layout)
        layout.addWidget(equipment_group)
        
    def get_preferences(self):
        """Return the current preferences as a dictionary."""
        return {
            "dimensions": {
                "width": self.room_width.value(),
                "length": self.room_length.value()
            },
            "work_style": self.work_style.currentText(),
            "noise_tolerance": self.noise_tolerance.currentText(),
            "equipment": {
                "monitors": self.monitors.value(),
                "standing_desk": self.standing_desk.isChecked(),
                "storage": self.storage.isChecked()
            }
        }
