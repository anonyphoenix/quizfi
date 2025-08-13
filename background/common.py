import requests

def read_env(env_path='../.env.local'):
    env_vars = {}
    with open(env_path) as f:
        for line in f:
            if line.startswith('#') or not line.strip():
                continue
            key, value = line.strip().split('=', 1)
            env_vars[key] = value
    return env_vars

def issue_oca():
    body = {
	    "credentialPayload": {
        "validFrom": "2023-12-10T16:00:00.000Z",
        "awardedDate": "2023-12-10T16:00:00.000Z",
        "description": "An achievement for achieving outstanding results in mathematics course",
        "credentialSubject": {
            "name": "John Doe",
            "type": "Person",
            "email": "[johndoe@something.edu](mailto:johndoe@something.edu)",
            "image": "[https://img.freepik.com/premium-vector/gold-medal-with-gold-ribbon-that-says-gold_1134661-43944.jpg](https://img.freepik.com/premium-vector/gold-medal-with-gold-ribbon-that-says-gold_1134661-43944.jpg)",
            "profileUrl": "[https://mycourse.xyz/profile/johndoe](https://mycourse.xyz/profile/johndoe)",
            "achievement": {
                "name": "Gold Medal Achievements",
                "identifier": "tt:1111222333",
                "description": "Reached 200 points in the intermediate mathematics",
                "achievementType": "Achievement"}},
        "holderOcId": "bob.edu"}
    }
    env = read_env()
    headers = {'X-API-KEY': env.get('OCA_API_KEY')}
    if env.get('NEXT_PUBLIC_ENV') == 'production':
        response = requests.post('https://api.vc.staging.opencampus.xyz/issuer/vc',
                                 headers=headers)
    else:
        response = requests.post('https://api.vc.opencampus.xyz/issuer/vc',
                                 headers=headers)
        