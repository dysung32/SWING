import gensim.downloader as api

# pretrained model load
wv = api.load('word2vec-google-news-300')

def word_similarity(answers, user_word):
    # 유저 입력 단어가 유효한지 테스트
    # 단어가 없으면 error 발생
    try:
        wv[user_word]
    except KeyError:
        return 'KeyError'
    
    similarities = {}
    for answer in answers:
        sim = round(wv.similarity(answer, user_word), 2)
        similarities.update({answer: sim})
    return similarities

# test
if __name__ == '__main__':
    answers = [
    'apple',
    'banana',
    'car',
    'computer',
    'coke',
    ]

    user_word = 'coke'

    print(word_similarity(answers, user_word))