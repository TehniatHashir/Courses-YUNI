from flask import Flask, jsonify
from app.config import Config
from app.extensions import db, migrate, jwt, cors

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGIN']}})

    # Health Check
    @app.route('/health')
    def health():
        return jsonify({"status": "ok"})

    # Register Blueprints
    from app.routes.auth import auth_bp
    from app.routes.courses import courses_bp
    from app.routes.blogs import blogs_bp
    from app.routes.contact import contact_bp

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(courses_bp, url_prefix='/api')
    app.register_blueprint(blogs_bp, url_prefix='/api')
    app.register_blueprint(contact_bp, url_prefix='/api')

    return app
