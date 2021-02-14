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
CORS(app)
# Init Database
db = SQLAlchemy(app)
from models import challenge, user, task, friends, prizes, competes
db.create_all()
from models.user import Users
from models.competes import competes

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



@app.route('/challenges/update/<user_id>,<challenge_id>,<status>', methods=['GET'])
def challenges_update(user_id, challenge_id, status):

    if status == "start":
        try:
            new = competes(uid=user_id, cid=challenge_id)
            db.session.add(new)
            db.session.commit()
            return ("success")
        except exc.IntegrityError as e:
            return("u entered same user twice")
    if status == "done":
        q = competes.query.filter_by(uid=user_id).first_or_404()
        if q.cid == int( challenge_id):
            return ("Challenge done, mark TODO delete it")
    return ("something went wrong")

# @app.route('/challenges/current/<user_id>', methods=['GET'])
# def challenges_current(user_id):
#     q = Users.query.filter_by(name='marky').first_or_404()

#     print(q.email)

###################Example of get request
@app.route('/user/<name>')
def show_user(name):
    user = model.Users.query.filter_by(name=name).first_or_404()
    return user.name

if __name__ == '__main__':
    app.run(debug=True)