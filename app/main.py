from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the Movie API!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
