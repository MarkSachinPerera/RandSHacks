from enum import unique
import requests,datetime
from main import db

class Task(db.Model):

    __tablename__ = 'task'

    taskid = db.Column(db.Integer,  primary_key=True, nullable = False, unique=True)   
    challengeId = db.Column(db.Integer, nullable = False, unique=True)
    taskname = db.Column(db.String(200), nullable= False)
    #status = db.Column(db.String(80))

    def __init__(self, taskid, challengeId, taskname):
        self.taskid = challengeId
        self.challengeId = challengeId
        self.taskname = taskname

    def __repr__(self):
        return 'Name %r' %self.id
