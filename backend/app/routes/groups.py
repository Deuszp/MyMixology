from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Group, GroupMembership, User, db, GroupSchema
from sqlalchemy.orm import joinedload

bp = Blueprint('groups', __name__, url_prefix='/api/groups')
group_schema = GroupSchema()
groups_schema = GroupSchema(many=True)

@bp.route('', methods=['POST'])
@jwt_required()
def create_group():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    new_group = Group(
        name=data['name'],
        description=data.get('description', '')
    )
    
    db.session.add(new_group)
    db.session.flush()
    
    membership = GroupMembership(
        user_id=current_user_id,
        group_id=new_group.id
    )
    
    db.session.add(membership)
    db.session.commit()
    
    return jsonify(group_schema.dump(new_group)), 201

@bp.route('', methods=['GET'])
@jwt_required()
def get_user_groups():
    current_user_id = get_jwt_identity()
    
    user_groups = Group.query \
        .join(GroupMembership) \
        .filter(GroupMembership.user_id == current_user_id) \
        .all()
    
    return jsonify(groups_schema.dump(user_groups)), 200

@bp.route('/<int:group_id>/members', methods=['POST'])
@jwt_required()
def add_group_member(group_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Check if current user is in the group
    membership = GroupMembership.query.filter_by(
        user_id=current_user_id, 
        group_id=group_id
    ).first()
    
    if not membership:
        return jsonify({"error": "Not authorized to add members"}), 403
    
    # Find user to add
    user_to_add = User.query.filter_by(username=data['username']).first()
    
    if not user_to_add:
        return jsonify({"error": "User not found"}), 404
    
    # Check if user is already in the group
    existing_membership = GroupMembership.query.filter_by(
        user_id=user_to_add.id, 
        group_id=group_id
    ).first()
    
    if existing_membership:
        return jsonify({"error": "User already in group"}), 400
    
    new_membership = GroupMembership(
        user_id=user_to_add.id,
        group_id=group_id
    )
    
    db.session.add(new_membership)
    db.session.commit()
    
    return jsonify({"message": "Member added successfully"}), 200
