from app import create_app, db
from config import DevelopmentConfig

app = create_app(DevelopmentConfig)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True, host='0.0.0.0', port=5000)
