from flask import Flask, request, jsonify, flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import os

# Init app
app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)


#MODELS
# User Class/Model
class User(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(80))

  def __init__(self, username, password):
    self.username = username
    self.password = generate_password_hash(password)

  def __repr__(self):
    return f'<User {self.username}>'

  def verify_password(self, pwd):
    return check_password_hash(self.password, pwd)

# Fields to show
class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'username', 'password')

# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# ROUTES/CONTROLLERS
# Signup
@app.route('/api/signup', methods=['POST'])
def signup():
  username = request.json['username']
  password = request.json['password']

  new_user = User(username, password)

  db.session.add(new_user)
  db.session.commit()
  return user_schema.jsonify(new_user), 201

# Login
@app.route('/api/login', methods=['POST'])
def login():
  username = request.json['username']
  password = request.json['password']

  user = User.query.filter_by(username=username).first()

  if user and user.verify_password(password):
    # login_user(user)
    return "Logging in", 200
  else:
    return "Invalid credentials", 401

# Logout
@app.route('/api/logout')
def logout():
    return "logout"

# Get Single User
@app.route('/api/user/<id>', methods=['GET'])
def get_user(id):
  user = User.query.get(id)
  return user_schema.jsonify(user)

# Get All Users
@app.route('/api/users', methods=['GET'])
def get_users():
  all_users = User.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)

# Update User credentials
@app.route('/api/user/<id>', methods=['PUT'])
def update_user(id):
  user = User.query.get(id)

  username = request.json['username']
  password = request.json['password']

  user.username = username
  user.password = generate_password_hash(password)

  db.session.commit()
  return user_schema.jsonify(user)

# Delete User
@app.route('/api/user/<id>', methods=['DELETE'])
def delete_user(id):
  user = User.query.get(id)
  db.session.delete(user)
  db.session.commit()
  return user_schema.jsonify(user)


# Run Server
if __name__ == '__main__':
  app.run(debug=True)