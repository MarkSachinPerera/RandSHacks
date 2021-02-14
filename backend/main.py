import json
import requests
from flask import Flask, render_template, jsonify
import spoof

# small test case server with data set to see if the front end can
# successfully recieve data and display that data

app = Flask(__name__)

data = []

@app.route('/')
def upload():
    return ("hello world")

@app.route('/status')
def status_update():
    status_update = spoof.get_status()
    return(jsonify(status_update))


if __name__ == '__main__':
    app.run()