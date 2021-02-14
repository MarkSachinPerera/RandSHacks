from sqlalchemy.exc import DatabaseError
from models import model
from main import db, app

challenge1 = model.Challenge(cid=123, name='Yoga', points='400', availability=True)
challenge2 = model.Challenge(cid=1232, name='Open Mic', points='650', availability=True)
challenge3 = model.Challenge(cid=1233, name='Jogging for 2km!', points='500', availability=True)
challenge4 = model.Challenge(cid=1234, name='Mediate with Me!', points='200', availability=True)
challenge5 = model.Challenge(cid=1235, name='30 Day Fitness Challenge/day10', points='150', availability=True)
challenge6 = model.Challenge(cid=1236, name='Pilates', points='800', availability=False)
challenge7 = model.Challenge(cid=1237, name='Book Club! :)', points='450', availability=True)
challenge8 = model.Challenge(cid=1238, name='Dungeons & Dragons', points='500', availability=True)
challenge9 = model.Challenge(cid=1239, name='Watch me play COD!', points='200', availability=True)
challenge10 = model.Challenge(cid=1231, name='Go for a walk', points='400', availability=True)

with app.app_context():
    
    db.session.add(challenge1)
    db.session.add(challenge2)
    db.session.add(challenge3)
    db.session.add(challenge4)
    db.session.add(challenge5)
    db.session.add(challenge6)
    db.session.add(challenge7)
    db.session.add(challenge8)
    db.session.add(challenge9)
    db.session.add(challenge10)
    
    db.session.commit()