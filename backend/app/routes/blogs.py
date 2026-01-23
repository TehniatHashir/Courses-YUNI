from flask import Blueprint, jsonify
from app.models import Blog

blogs_bp = Blueprint('blogs', __name__)

@blogs_bp.route('/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()
    return jsonify([blog.to_dict() for blog in blogs]), 200
