import json
import requests
from flask import Flask, render_template, jsonify
import spoof

# small test case server with data set to see if the front end can
# successfully recieve data and display that data

app = Flask(__name__)


@app.route('/')
def upload():
    return ("hello world")

@app.route('/status', methods=['GET'])
def status_update():

    data = spoof.get_status()
    return ( jsonify({'Status' : data}) )


if __name__ == '__main__':
    app.run()