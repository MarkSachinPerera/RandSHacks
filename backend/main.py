import json
import requests
from flask import Flask, render_template, jsonify

# small test case server with data set to see if the front end can
# successfully recieve data and display that data

app = Flask(__name__)

data = []

@app.route('/')
def upload():
    return ("hello world")
