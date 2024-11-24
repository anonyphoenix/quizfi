from pymongo import MongoClient
import common

env = common.read_env()
client = MongoClient(env.get('MONGODB_URI'))

try:

    badge_id = input('Badge ID: ')
    badge_name = input('Badge name: ')
    badge_descripion = input('Badge description: ')
    badge_img = input('Badge image (relative to image host): ')

    database = client.get_database(env.get('MONDODB_DB'))
    badge = database.get_collection('badge')

    badge.insert_one({
        'id': badge_id,
        'name': badge_name,
        'description': badge_descripion,
        'img': badge_img
    })

    print('Badge inserted to DB. Mint the badge with the same ID in the smart contract.')

except Exception as e:
    raise Exception("Error: ", e)