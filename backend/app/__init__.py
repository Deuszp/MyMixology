from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
ma = Marshmallow()
jwt = JWTManager()

def create_app(config_object=None):
    app = Flask(__name__)
    
    # Configure the app
    if config_object:
        app.config.from_object(config_object)
    
    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Import and register blueprints
    from .routes import auth, expenses, groups, root
    app.register_blueprint(root.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(expenses.bp)
    app.register_blueprint(groups.bp)
    
    return app
