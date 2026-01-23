from flask import Blueprint, request, jsonify
from app.models import ContactMessage
from app.extensions import db

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    
    if not data:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not subject or not message:
        return jsonify({"msg": "Missing required fields"}), 400

    new_message = ContactMessage(
        name=name,
        email=email,
        subject=subject,
        message=message
    )
    
    db.session.add(new_message)
    db.session.commit()

    return jsonify({"msg": "Message submitted successfully"}), 201
