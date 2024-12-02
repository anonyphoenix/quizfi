from pymongo import MongoClient
import common

env = common.read_env()
client = MongoClient(env.get('MONGODB_URI'))

try:

    database = client.get_database(env.get('MONDODB_DB'))
    badge = database.get_collection('badge')

    is_default = input('Do you want to create default details for all default badges? (Y/n): ')

    if is_default == 'Y' or is_default == 'y':
        
        badge.insert_one({
            'id': '0',
            'name': 'QuizFi Money',
            'description': 'QuizFi money can be awarded to selected quiz takers.',
            'img': 'money.png'
        })

        badge.insert_one({
            'id': '1',
            'name': 'Gold Medal',
            'description': 'Gold medal is awarded to quiz takers who got the highest score in a quiz.',
            'img': 'gold_medal.png'
        })

        badge.insert_one({
            'id': '2',
            'name': 'Silver Medal',
            'description': 'Silver medal is awarded to quiz takers who scored second best in a quiz.',
            'img': 'silver_medal.png'
        })

        badge.insert_one({
            'id': '3',
            'name': 'Bronze Medal',
            'description': 'Bronze medal is awarded to quiz takers whose score ranks the third in a quiz.',
            'img': 'bronze_medal.png'
        })

        badge.insert_one({
            'id': '4',
            'name': 'POAP',
            'description': 'Proof of active participation (POAP) is awarded to everyone who takes a quiz.',
            'img': 'poap.png'
        })

    else:
        badge_id = input('Badge ID: ')
        badge_name = input('Badge name: ')
        badge_descripion = input('Badge description: ')
        badge_img = input('Badge image (relative to image host): ')

        badge.insert_one({
            'id': badge_id,
            'name': badge_name,
            'description': badge_descripion,
            'img': badge_img
        })

        print('Badge inserted to DB. Mint the badge with the same ID in the smart contract.')

    client.close()

except Exception as e:
    raise Exception("Error: ", e)