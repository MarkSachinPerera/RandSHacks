import requests
from backend.main import db

#(MARK) Challenges(CID, Name, Points, Availability)
class challenge(db.Model):
    cid = db.Column(db.Integer(), primary_key=True, nullable = False, unique=True)
    name = db.Column(db.String(80), unique=True,nullable = False)
    points = db.Column(db.Integer(),nullable = False)
    availability = db.Column(db.Boolean() ,nullable = False)

    def __init__(self, cid, name, points, availability):
        self.cid = cid
        self.name = name
        self.points = points
        self.availability = availability
    
    def __repr__(self):
        return 'Name %r' %self.name

    