from enum import unique
import json, re, requests
from requests.api import post
from flask import Flask, render_template, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import spoof



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///teamate.db'
# Init Database
db = SQLAlchemy(app)


@app.route('/')
def upload():
    return ("hello world")

@app.route('/status', methods=['GET'])
def get_status_update():

    data = spoof.get_status()
    return ( jsonify({'Status' : data}) )

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return(jsonify ( {'Leaderboard' : spoof.get_leaderboard() } ))

@app.route('/challenges/update/', methods=['PUT'])
def challenges_update(user_id, challenge_id, status):
    return( jsonify( {'message':'In progress'}))

@app.route('/challenges/current/', methods=['GET'])
def challenges_current(userId):
    return( jsonify( {'message':'In progress'}))


    
from models import challenge, user, task, friends
db.create_all()
if __name__ == '__main__':
    app.run(debug=True)