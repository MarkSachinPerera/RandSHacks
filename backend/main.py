from enum import unique
import json, re, requests
from requests.api import post
from flask import Flask, render_template, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import spoof
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///teamate.db'
# Init Database
db = SQLAlchemy(app)
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

@app.route('/challenges/update/', methods=['PUT'])
def challenges_update(user_id, challenge_id, status):
    return( jsonify( {'message':'In progress'}))

@app.route('/challenges/current/', methods=['GET'])
def challenges_current(userId):
    return( jsonify( {'message':'In progress'}))


    
from models import challenge, user, task, friends, prizes, competes
db.create_all()
if __name__ == '__main__':
    app.run(debug=True)