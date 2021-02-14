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





@app.route('/')
def upload():
    return ("hello world")

@app.route('/status', methods=['GET'])
def status_update():

    data = spoof.get_status()
    return ( jsonify({'Status' : data}) )



if __name__ == '__main__':
    app.run(debug=True)