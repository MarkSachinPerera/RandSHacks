from enum import unique
import json, re, requests, random
from requests.api import post
from flask import Flask, render_template, jsonify, redirect, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from datetime import datetime
from spoof import Spoof
from flask_cors import CORS, cross_origin
from collections.abc import Iterable 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///teamate.db'
CORS(app)
# Init Database
db = SQLAlchemy(app)
from models import model
db.create_all()
myspoof = Spoof()
# app.config['CORS_HEADERS'] = 'Content-Type'

from sqlalchemy.ext.declarative import DeclarativeMeta

class AlchemyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)

@app.route('/')
def upload():
    return ("hello world")

@app.route('/feed', methods=['GET'])
def get_feed_update():
    return ( jsonify({'Feed' : myspoof.get_status()}) )

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return(jsonify ( {'Leaderboard' : myspoof.get_leaderboard() } ))


###########POST###############################
@app.route('/register/<name>,<email>,<password>', methods=['GET'])
def post_register(name, password, email):
    # try:
    #     new_user = model.Users(name=name, password=password, email=email)
    #     db.session.add(new_user)
    #     db.session.commit()
    # except exc.IntegrityError as e:
    #     return("u entered same user twice")
    # return redirect('/')
    myspoof.userInfo['name'] = name
    myspoof.userInfo['password'] = password
    myspoof.userInfo['email'] = email
    return redirect('/')



@app.route('/challenges/update/<user_id>,<challenge_id>,<status>', methods=['GET'])
def challenges_update(user_id, challenge_id, status):

    if myspoof.userInfo['challenge'] == -1 and status == "start":
        myspoof.userInfo['challenge'] = challenge_id
        return redirect('/')
    elif myspoof.userInfo['challenge'] > 0 and status == "done":
        myspoof.userInfo['challenge'] = -1
        return redirect('/')
    return('no')

@app.route('/challenges/get/')
def get_challenges():
    chal = model.Challenge.query.with_entities(model.Challenge.cid, model.Challenge.name, model.Challenge.points)
    return jsonify(json_list = chal.all())

@app.route('/prizes/all', methods=['GET'])
def get_all_prizes():

    
    prizeList = myspoof.create_prizes()

    return (jsonify ( { 'Prizes' :  prizeList} ) )

@app.route('/challenges/current', methods=['GET'])
def challenges_current(user_id):

    if myspoof.userInfo['challenge'] > 0:
        return ( jsonify( { 'Current' : myspoof.userInfo['challenge']}))
    return ('no')

###################Full user functions ########################

@app.route('/user/auth/<email>,<password>')
def auth_user(email,password):
    # user = model.Users.query.filter_by(name=name).first_or_404()
    # return user.name

    if email == myspoof.userInfo['email'] and password == myspoof.userInfo['password']:
        return redirect('/')
    else:
        return('no')

@app.route('/user/name')
def show_user():
    # user = model.Users.query.filter_by(name=name).first_or_404()
    # return user.name

    return ( jsonify ( {'Name' : myspoof.get_user_name()} ) )

@app.route('/user/score')
def get_user_score():
    # user = model.Users.query.filter_by(name=name).first_or_404()
    # return user.name

    return ( jsonify ( {'Score' : myspoof.userInfo['score']} ) )

@app.route('/user/friends')
def get_user_friends():
    data = {}
    fulllist = myspoof.get_leaderboard()
    friendlist = myspoof.get_user_friends()

    for i in friendlist:
        data[i] = {
            'name' : fulllist[i]['name'],
            'imageurl' : fulllist[i]['imgurl']
            
        }
    return( jsonify ( {'Friends' : data}))


########################################################################
if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')