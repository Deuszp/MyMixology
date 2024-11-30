from . import db, ma
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from marshmallow import fields

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    
    groups = relationship('GroupMembership', back_populates='user')
    expenses = relationship('Expense', back_populates='payer')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Group(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    members = relationship('GroupMembership', back_populates='group')
    expenses = relationship('Expense', back_populates='group')

class GroupMembership(db.Model):
    __tablename__ = 'group_memberships'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    
    user = relationship('User', back_populates='groups')
    group = relationship('Group', back_populates='members')

class Expense(db.Model):
    __tablename__ = 'expenses'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    payer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    
    payer = relationship('User', back_populates='expenses')
    group = relationship('Group', back_populates='expenses')
    splits = relationship('ExpenseSplit', back_populates='expense')

class ExpenseSplit(db.Model):
    __tablename__ = 'expense_splits'
    id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey('expenses.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    
    expense = relationship('Expense', back_populates='splits')
    user = relationship('User')

# Marshmallow Schemas
class UserSchema(ma.Schema):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class GroupSchema(ma.Schema):
    class Meta:
        model = Group
        fields = ('id', 'name', 'description', 'created_at')

class ExpenseSchema(ma.Schema):
    class Meta:
        model = Expense
        fields = ('id', 'description', 'amount', 'date', 'payer_id', 'group_id')
    
    payer = fields.Nested(UserSchema)
    splits = fields.Nested('ExpenseSplitSchema', many=True)

class ExpenseSplitSchema(ma.Schema):
    class Meta:
        model = ExpenseSplit
        fields = ('id', 'expense_id', 'user_id', 'amount')
    
    user = fields.Nested(UserSchema)
