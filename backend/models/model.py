import requests
from main import db


#(MARK) Challenges(CID, Name, Points, Availability)
class Challenge(db.Model):
    __tablename__ = 'challenge'

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
        return ('Name %r' %self.name)

#Prizes( PID, Name, Points)
class Friends(db.Model):

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

class Users(db.Model):

    __tablename__ = 'user'

    name = db.Column(db.String(200), nullable = False, unique=True)
    email = db.Column(db.String(80), primary_key = True, unique=True)
    password = db.Column(db.String(80))

    def __init__(self, email, password, name):
        self.email = email
        self.name = name
        self.password = password

    def __repr__(self):
        return ('Name %r' %self.id)

#Competes(UID, CID)
class Competes(db.Model):

    __tablename__ = 'competes'

    uid = db.Column(db.Integer(), primary_key=True, nullable = False)
    cid = db.Column(db.Integer(), nullable = False)
    # status = db.Column(db.String(200), nullable = False)

    def __init__(self, uid, cid):
        self.uid = uid
        self.cid = cid
        # self.status = status

    def __repr__(self):
        return "<competes(uid='%s', cid='%s')>" % ( self.uid, self.cid)