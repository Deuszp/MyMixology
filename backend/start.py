import os
import sys
from dotenv import load_dotenv

def main():
    # Load environment variables
    load_dotenv()
    
    # Set Flask environment variables
    os.environ['FLASK_APP'] = 'run.py'
    os.environ['FLASK_ENV'] = 'development'
    os.environ['FLASK_DEBUG'] = 'True'
    
    try:
        from app import create_app, db
        from config import DevelopmentConfig
        
        app = create_app(DevelopmentConfig)
        
        with app.app_context():
            db.create_all()
            print("Database tables created successfully!")
        
        print("Starting Flask server...")
        app.run(debug=True, host='127.0.0.1', port=5000)
        
    except Exception as e:
        print(f"Error starting server: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main()
