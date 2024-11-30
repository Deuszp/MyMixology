from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..models import User, db, UserSchema
from sqlalchemy.exc import IntegrityError
from flask_cors import cross_origin

bp = Blueprint('auth', __name__, url_prefix='/api/auth')
user_schema = UserSchema()

@bp.route('/register', methods=['POST'])
@cross_origin()
def register():
    print(f"Register request received - Method: {request.method}")
    print(f"Request data: {request.get_json()}")
    
    data = request.get_json()
    
    try:
        new_user = User(
            username=data['username'],
            email=data['email']
        )
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify(user_schema.dump(new_user)), 201
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Username or email already exists"}), 400
    except KeyError as e:
        return jsonify({"error": f"Missing required field: {str(e)}"}), 400
    except Exception as e:
        print(f"Register error: {str(e)}")
        return jsonify({"error": "Registration failed"}), 500

@bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    print(f"Login request received - Method: {request.method}")
    print(f"Request data: {request.get_json()}")
    
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    if 'username' not in data or 'password' not in data:
        return jsonify({"error": "Username and password are required"}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': user_schema.dump(user)
        }), 200
    
    return jsonify({"error": "Invalid username or password"}), 401

@bp.route('/profile', methods=['GET'])
@jwt_required()
@cross_origin()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    return jsonify(user_schema.dump(user)), 200
