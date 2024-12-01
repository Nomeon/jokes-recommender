from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route("/api/hello", methods=["GET"])
def hello():
   return jsonify({"message": "Hello, World!"}), 200