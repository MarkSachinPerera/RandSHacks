import requests
from backend.main import db

class Users(db.Model):
    name = db.Column(db.String(200), nullable = False, unique=True)
    email = db.Column(db.String(80), primary_key=True, unique=True)
    password = db.Column(db.String(80))
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, email, password, name):
        self.email = email
        self.name = name
        self.password = password
    def __repr__(self):
        return 'Name %r' %self.id
