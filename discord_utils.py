import requests
import os
from dotenv import load_dotenv

load_dotenv()




class DiscordUtils():



    def get_client_info_json(self,user_id):
        
        token = os.environ.get('DISCORD_BOT_TOKEN')

        url = f'https://discord.com/api/v9/users/{user_id}'

        print(token)

        headers = {
            'Authorization': f'Bot {token}'
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            user_data_json = response.json()
            if 'message' in user_data_json.keys():
                return None
            else:
                return user_data_json

        else:
            return 0



utils = DiscordUtils()

user_data = utils.get_client_info_json('573023459907469324')
