import requests
from main import db

#Prizes( PID, Name, Points)
class friends(db.Model):

    __tablename__ = 'prizes'

    pid = db.Column(db.Integer(), primary_key=True, nullable = False, unique=True)
    name = db.Column(db.String(200), nullable = False)
    points = db.Column(db.Integer(), nullable = False)

    def __init__(self, pid, name, points):
        self.pid = pid
        self.name = name
        self.points = points
    
    def __repr__(self):
        return "<prizes(pid='%s', name='%s', points='%s')>" % ( self.pid, self.name, self.points)
