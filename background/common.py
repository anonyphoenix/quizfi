def read_env(env_path='../.env.local'):
    env_vars = {}
    with open(env_path) as f:
        for line in f:
            if line.startswith('#') or not line.strip():
                continue
            key, value = line.strip().split('=', 1)
            env_vars[key] = value
    return env_vars