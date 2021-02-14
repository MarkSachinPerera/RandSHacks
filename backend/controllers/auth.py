import functools, json, requests

from flask import blueprints, flash, redirect, render_template, request
from flask import Blueprint, session, url_for, g

from backend.models.user import Users

blueprint = Blueprint('auth', __name__, url_prefix='/auth')


@blueprint.route('/register', methods=['POST'])
def signup():
    if requests.method == 'POST':
        user_name = requests.form['name']
        user_email = requests.form['email']
        user_password = requests.form['password']
        new_user = Users(name=user_name, password=user_password, email=user_email)

    try:
        session.add(new_user)
        session.commit()
        return redirect('/')
    except:
        return "error"