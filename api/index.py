from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client
import uuid
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)


# Utilize Supabase functions to get unrated jokes:
@app.route("/api/get-unrated-joke", methods=["GET"])
def get_unrated_joke():
      user_id = request.args.get("user_id")
      if not user_id or not user_id.isdigit():
         return jsonify({"error": "Valid User ID is required"}), 400

      user_id = int(user_id)  # Convert to integer

      try:
         # Call the Supabase stored procedure
         response = supabase.rpc("get_unrated_joke", {"user_id": user_id}).execute()

         if not response.data:
            return jsonify({"error": "No unrated jokes found"}), 404

        # Return the joke details
         joke = response.data[0]
         return jsonify({"joke": joke}), 200
      except Exception as e:
         return jsonify({"error": str(e)}), 500


@app.route("/api/rate-joke", methods=["POST"])
def rate_joke():
    data = request.get_json()  # Parse the JSON body
    user_id = data.get("user_id")
    joke_id = data.get("joke_id")
    rating = data.get("rating")

    if not user_id or not joke_id or not rating:
        return jsonify({"error": "User ID, joke ID, and rating are required"}), 400

    try:
        res = supabase.table("jester_ratings").insert({"userId": user_id, "jokeId": joke_id, "rating_scaled": rating}).execute()
        print(res)
        return jsonify({"message": "Rating saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
