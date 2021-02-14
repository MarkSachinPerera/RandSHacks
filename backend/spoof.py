import json
import requests, random
from flask import jsonify
from faker import Faker

# returns json data of 5 random people + status updates
def get_status():
    fake = Faker()
    names = []
    actions = [" completed a challenge, 10 points.", " says Hi!", " just logged in!", " just finished a run. 50 points.", " joined Yoga.",
    " is learning pottery. 20 points."]
    status = []

    for i in range(20):
        names.append(fake.name())

    for i in names:
        status.append(i + random.choice(actions))

    data = {}
    index = 0
    for i in status:
        data[index] = i
        index = index + 1


    # print (data)

    return(status)

def get_leaderboard():
    fake = Faker()

    names = []
    points = []
    imageurl = [
        'https://semantic-ui.com/images/avatar/small/ade.jpg',
        'https://semantic-ui.com/images/avatar/small/chris.jpg',
        'https://semantic-ui.com/images/avatar/small/christian.jpg',
        'https://semantic-ui.com/images/avatar/small/daniel.jpg',
        'https://semantic-ui.com/images/avatar/small/elliot.jpg',
        'https://semantic-ui.com/images/avatar/small/helen.jpg',
        'https://semantic-ui.com/images/avatar/small/jenny.jpg',
        'https://semantic-ui.com/images/avatar/small/daniel.jpg',
        'https://semantic-ui.com/images/avatar/small/elliot.jpg',
        'https://semantic-ui.com/images/avatar/small/helen.jpg'
    ]

    for i in range(10):
        names.append(fake.name())
        points.append(random.randint(10,(i+1)*100) * 10)

    points.sort(reverse=True)

    
    data = {}

    for i in range(0,10):
        data[i+1] = { 'name' : names[i], 
        'score' : points[i], 'imgurl' : imageurl[i]}

    return(data)    


if __name__ == "__main__":
    # create_people()
    print(get_leaderboard())