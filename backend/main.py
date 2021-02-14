from enum import unique
import json, re, requests
from requests.api import post
from flask import Flask, render_template, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import spoof


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# Init Database
db = SQLAlchemy(app)

# Create db model
class Users(db.Model):
    name = db.Column(db.String(200), nullable = False, unique=True)
    email = db.Column(db.String(80), primary_key=True, unique=True)
    password = db.Column(db.String(80))
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

# Creat funct to return string when wee add something
    def __init__(self, email, password, name):
        self.email = email
        self.name = name
        self.password = password
    def __repr__(self):
        return 'Name %r' %self.id

class Challenges(db.Model):
    name = db.Column(db.String(200), nullable = False, unique=True)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

# Creat funct to return string when wee add something
    def __init__(self, email, password, name):
        self.email = email
        self.name = name
        self.password = password
    def __repr__(self):
        return 'Name %r' %self.id



@app.route('/')
def upload():
    return ("hello world")

@app.route('/status', methods=['GET'])
def status_update():

    data = spoof.get_status()
    return ( jsonify({'Status' : data}) )


@app.route('/register', methods=['POST'])
def signup():
    if requests.method == 'POST':
        user_name = requests.form['name']
        user_email = requests.form['email']
        user_password = requests.form['password']
        new_user = Users(name=user_name, password=user_password, email=user_email)

    try:
        db.session.add(new_user)
        db.session.commit()
        return redirect('/')
    except:
        return "error"

if __name__ == '__main__':
    app.run(debug=True)