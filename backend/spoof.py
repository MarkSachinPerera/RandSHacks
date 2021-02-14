import json
import requests, random
from flask import jsonify
from faker import Faker

# returns json data of 5 random people + status updates
def get_status():
    fake = Faker()
    names = []
    actions = [' completed a challenge, 10 points.', ' says Hi!', ' just logged in!', ' just finished a run. 50 points.', ' joined Yoga.',
    ' is learning pottery. 20 points.']
    status = []

    for i in range(20):
        names.append(fake.name())

    for i in names:
        status.append(i + random.choice(actions))

    # print(status)
    return(random.sample(status,5))



    


if __name__ == '__main__':
    # create_people()
    print(get_status())