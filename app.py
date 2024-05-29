from flask import Flask, render_template, request, jsonify
from discord_utils import DiscordUtils


dcutils = DiscordUtils()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_report', methods=['POST'])
def submit_report():
    data = request.json
    user_id = data.get('user_id')
    offence = data.get('offence')
    action = data.get('action')
    advice = data.get('advice')
    rm = data.get('rm')
    try:
        user_data_json = dcutils.get_client_info_json(user_id)
        username = user_data_json['username']
    except Exception as e:
        return jsonify({"error": "User not found"}), 404

    

    formatted_data = {
        "user_id": user_id,
        "username":username,
        "report": {
            "offence": offence,
            "action": action,
            "advice": advice,
            "rm": rm
        }
    }

    return jsonify(formatted_data)

if __name__ == '__main__':
    app.run(debug=True)
