from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Expense, ExpenseSplit, Group, User, db, ExpenseSchema
from sqlalchemy.orm import joinedload

bp = Blueprint('expenses', __name__, url_prefix='/api/expenses')
expense_schema = ExpenseSchema()
expenses_schema = ExpenseSchema(many=True)

@bp.route('', methods=['POST'])
@jwt_required()
def create_expense():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate group membership
    group = Group.query.get_or_404(data['group_id'])
    
    new_expense = Expense(
        description=data['description'],
        amount=data['amount'],
        payer_id=current_user_id,
        group_id=data['group_id']
    )
    
    db.session.add(new_expense)
    db.session.flush()
    
    # Handle expense splits
    splits = data.get('splits', [])
    total_split_amount = 0
    
    for split in splits:
        split_amount = split['amount']
        total_split_amount += split_amount
        
        expense_split = ExpenseSplit(
            expense_id=new_expense.id,
            user_id=split['user_id'],
            amount=split_amount
        )
        db.session.add(expense_split)
    
    # Validate total split amount
    if abs(total_split_amount - new_expense.amount) > 0.01:
        db.session.rollback()
        return jsonify({"error": "Split amounts do not match total expense"}), 400
    
    db.session.commit()
    
    return jsonify(expense_schema.dump(new_expense)), 201

@bp.route('/group/<int:group_id>', methods=['GET'])
@jwt_required()
def get_group_expenses(group_id):
    current_user_id = get_jwt_identity()
    
    # Verify user is in the group
    group = Group.query.options(
        joinedload(Group.members)
    ).get_or_404(group_id)
    
    is_member = any(membership.user_id == current_user_id for membership in group.members)
    
    if not is_member:
        return jsonify({"error": "Not authorized to view group expenses"}), 403
    
    expenses = Expense.query \
        .filter_by(group_id=group_id) \
        .options(joinedload(Expense.splits)) \
        .order_by(Expense.date.desc()) \
        .all()
    
    return jsonify(expenses_schema.dump(expenses)), 200

@bp.route('/balances/group/<int:group_id>', methods=['GET'])
@jwt_required()
def get_group_balances(group_id):
    current_user_id = get_jwt_identity()
    
    # Verify user is in the group
    group = Group.query.get_or_404(group_id)
    
    # Calculate balances
    balances = {}
    
    # Get all expenses in the group
    expenses = Expense.query \
        .filter_by(group_id=group_id) \
        .options(joinedload(Expense.splits)) \
        .all()
    
    for expense in expenses:
        # Track who paid
        if expense.payer_id not in balances:
            balances[expense.payer_id] = 0
        balances[expense.payer_id] += expense.amount
        
        # Track splits
        for split in expense.splits:
            if split.user_id not in balances:
                balances[split.user_id] = 0
            balances[split.user_id] -= split.amount
    
    # Convert to more readable format
    balance_details = []
    for user_id, balance in balances.items():
        user = User.query.get(user_id)
        balance_details.append({
            'user_id': user_id,
            'username': user.username,
            'balance': round(balance, 2)
        })
    
    return jsonify(balance_details), 200
