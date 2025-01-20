from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = "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"

@app.route('/suggestions', methods=['GET'])
def get_suggestions():
    field = request.args.get('field')
    query = request.args.get('query')

    if not query:
        return jsonify([])  # Return an empty list if the query is empty

    # Use the new ChatCompletion API
    prompt = f"Suggest common {field} based on: {query}"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a helpful assistant."},
                  {"role": "user", "content": prompt}],
        max_tokens=50
    )

    suggestions = response['choices'][0]['message']['content'].strip().split("\n")
    return jsonify(suggestions)

if __name__ == '__main__':
    app.run(debug=True)
