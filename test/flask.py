import requests

url = 'http://127.0.0.1:5000/upload'
file_path = 'path_to_your_image.jpg'

with open(file_path, 'rb') as file:
    files = {'file': file}
    response = requests.post(url, files=files)

print(response.json())