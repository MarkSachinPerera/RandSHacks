from enum import unique
import json, re, requests
from requests.api import post
from flask import Flask, render_template, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# small test case server with data set to see if the front end can
# successfully recieve data and display that data

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# Init Database
db = SQLAlchemy(app)



data = []


@app.route('/')
def upload():
    return ("hello world")

@app.route('/status')
def status_update():
    status_update = spoof.get_status()
    return(jsonify(status_update))



def upload():
    return ("hello world")
