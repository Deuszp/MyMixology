from app import create_app, db
from app.models import User
from config import DevelopmentConfig

app = create_app(DevelopmentConfig)

def create_test_user():
    with app.app_context():
        # Check if user already exists
        existing_user = User.query.filter_by(username='testuser').first()
        if existing_user:
            print("Test user already exists!")
            return
        
        # Create new user
        user = User(
            username='testuser',
            email='test@example.com'
        )
        user.set_password('password123')
        
        # Add to database
        db.session.add(user)
        db.session.commit()
        print("Test user created successfully!")
        print("Username: testuser")
        print("Password: password123")

if __name__ == '__main__':
    create_test_user()
