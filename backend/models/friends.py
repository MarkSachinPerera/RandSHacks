import requests
from main import db

#Friends (UID, FID)
class friends(db.Model):

    __tablename__ = 'friends'
    
    uid = db.Column(db.Integer(), primary_key=True, nullable = False, unique=True)
    fid = db.Column(db.Integer(), unique=True,nullable = False)

    def __init__(self, uid, fid):
        self.uid = uid
        self.fid = fid
    
    def __repr__(self):
        return "<friend(userid='%s', friendid='%s')>" % ( self.uid, self.fid)
