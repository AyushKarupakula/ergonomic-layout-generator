from PyQt5.QtWidgets import (
    QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QPushButton, QLabel, QTabWidget, QMessageBox
)
from PyQt5.QtCore import Qt
from .input_forms import PreferencesForm
from utils.logger import setup_logger

class MainWindow(QMainWindow):
    def __init__(self, config):
        super().__init__()
        self.config = config
        self.logger = setup_logger()
        self.init_ui()
        
    def init_ui(self):
        """Initialize the user interface."""
        self.setWindowTitle('AI Workspace Layout Generator')
        self.setMinimumSize(800, 600)
        
        # Create central widget and main layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        
        # Create tab widget
        tabs = QTabWidget()
        layout.addWidget(tabs)
        
        # Add tabs
        tabs.addTab(self.create_preferences_tab(), "Preferences")
        tabs.addTab(self.create_layout_tab(), "Layout Generation")
        tabs.addTab(self.create_preview_tab(), "3D Preview")
        
        # Add status bar
        self.statusBar().showMessage('Ready')
        
    def create_preferences_tab(self):
        """Create the preferences input tab."""
        tab = QWidget()
        layout = QVBoxLayout(tab)
        
        # Add preferences form
        preferences_form = PreferencesForm()
        layout.addWidget(preferences_form)
        
        # Add save button
        save_button = QPushButton("Save Preferences")
        save_button.clicked.connect(self.save_preferences)
        layout.addWidget(save_button)
        
        return tab
        
    def create_layout_tab(self):
        """Create the layout generation tab."""
        tab = QWidget()
        layout = QVBoxLayout(tab)
        
        # Add generate button
        generate_button = QPushButton("Generate Layout")
        generate_button.clicked.connect(self.generate_layout)
        layout.addWidget(generate_button)
        
        return tab
        
    def create_preview_tab(self):
        """Create the 3D preview tab."""
        tab = QWidget()
        layout = QVBoxLayout(tab)
        
        # Placeholder for 3D viewer
        layout.addWidget(QLabel("3D Preview will be displayed here"))
        
        # Export buttons
        export_layout = QHBoxLayout()
        export_rhino = QPushButton("Export to Rhino")
        export_revit = QPushButton("Export to Revit")
        
        export_rhino.clicked.connect(self.export_to_rhino)
        export_revit.clicked.connect(self.export_to_revit)
        
        export_layout.addWidget(export_rhino)
        export_layout.addWidget(export_revit)
        layout.addLayout(export_layout)
        
        return tab
    
    def save_preferences(self):
        """Save user preferences."""
        self.logger.info("Saving preferences...")
        # TODO: Implement preferences saving
        QMessageBox.information(self, "Success", "Preferences saved successfully!")
    
    def generate_layout(self):
        """Generate workspace layout based on preferences."""
        self.logger.info("Generating layout...")
        # TODO: Implement layout generation
        QMessageBox.information(self, "Success", "Layout generated successfully!")
    
    def export_to_rhino(self):
        """Export the generated layout to Rhino."""
        self.logger.info("Exporting to Rhino...")
        # TODO: Implement Rhino export
        
    def export_to_revit(self):
        """Export the generated layout to Revit."""
        self.logger.info("Exporting to Revit...")
        # TODO: Implement Revit export
