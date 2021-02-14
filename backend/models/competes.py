import requests
from main import db

#Competes(UID, CID)
class competes(db.Model):

    __tablename__ = 'competes'

    uid = db.Column(db.Integer(), primary_key=True, nullable = False)
    cid = db.Column(db.Integer(), nullable = False)

    def __init__(self, uid, cid):
        self.uid = uid
        self.cid = cid
    
    def __repr__(self):
        return "<competes(uid='%s', cid='%s')>" % ( self.uid, self.cid)