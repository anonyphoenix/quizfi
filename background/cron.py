from pymongo import MongoClient
import datetime

uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.12'
client = MongoClient(uri)

try:
    database = client.get_database('quiz1')
    quiz = database.get_collection('quiz')
    result = database.get_collection('result')
    balance = database.get_collection('balance')

    query = { 'prizeProcessed': False , 'startTime': { '$lt' : datetime.datetime.now() }}
    quizzes = quiz.find(query)

    for quiz in quizzes:
        if datetime.timedelta(minutes=quiz.timelimit) + datetime.datetime.fromisoformat(quiz.startTime) \
            < datetime.datetime.now():
            # process winners
            results = result.find({ 'quizId': quiz.id }).sort({ 'score': -1 })
            winners = []
            best_score = 0
            best_score_set = False
            for res in results:
                if not best_score_set:
                    best_score = res.score
                if res.score < best_score:
                    break
                winners.append(res.userId)
            prize = result.prizeAmount / len(winners)
            result.update_many({ 'quizId': quiz.id, 'userId' : { '$in': winners }}, { '$set' : { 'prizeWon': prize }})
            balance.update_many({ 'userId' : { '$in': winners }}, { '$inc' : { 'balance': prize }}, upsert=True)
            quiz.update_one({ 'id' : quiz.id }, { '$set' : { 'prizeProcessed' : True} })

    client.close()

except Exception as e:
    raise Exception("Error: ", e)
