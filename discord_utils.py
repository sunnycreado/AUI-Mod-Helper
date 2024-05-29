import requests
import os

DISCORD_TOKEN  = os.environ.get('DISCORD_BOT_TOKEN')

class DiscordUtils():


    def get_discord_token(self):
        return DISCORD_TOKEN

    def get_client_info_json(self,user_id):
        
        token = self.get_discord_token()

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
