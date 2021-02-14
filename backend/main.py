from enum import unique
import json, re, requests
from requests.api import post
from flask import Flask, render_template, jsonify, redirect, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from datetime import datetime
import spoof
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///teamate.db'
# Init Database
db = SQLAlchemy(app)

from models import model
db.create_all()




CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def upload():
    return ("hello world")

@app.route('/feed', methods=['GET'])
def get_feed_update():
    return ( jsonify({'Feed' : spoof.get_status()}) )

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return(jsonify ( {'Leaderboard' : spoof.get_leaderboard() } ))


###########POST###############################
@app.route('/register/<name>,<email>,<password>', methods=['GET'])
def post_register(name, password, email):
    try:
        new_user = model.Users(name=name, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()
    except exc.IntegrityError as e:
        return("u entered same user twice")
    return redirect('/')



@app.route('/challenges/update/<name>,<password>,<email>')
def challenges_update():
    new_user = Users(name='jake', password='pass', email='john')
    db.session.add(new_user)
    db.session.commit()
    return redirect('/')

# @app.route('/challenges/current/', methods=['GET'])
# def challenges_current():
#     if request.method == 'GET':
#         try:
#             userid = request.args.get('name')
#         except:
#             print ('error')
#     return jsonify( {'User': userid})

###################Example of get request
@app.route('/user/<name>')
def show_user(name):
    user = model.Users.query.filter_by(name=name).first_or_404()
    return user.name

if __name__ == '__main__':
    app.run(debug=True)