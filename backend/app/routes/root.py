from flask import Blueprint, jsonify

bp = Blueprint('root', __name__)

@bp.route('/')
def index():
    return jsonify({
        "message": "Welcome to Splitwise API",
        "version": "1.0",
        "status": "running"
    })
