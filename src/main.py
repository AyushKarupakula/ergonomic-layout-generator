import sys
from PyQt5.QtWidgets import QApplication
from ui.user_interface import MainWindow
from utils.logger import setup_logger
from config import load_config

def main():
    # Setup logging
    logger = setup_logger()
    logger.info("Starting AI Workspace Layout Generator")

    # Load configuration
    config = load_config()
    
    # Initialize Qt application
    app = QApplication(sys.argv)
    
    # Create and show main window
    window = MainWindow(config)
    window.show()
    
    # Start event loop
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
