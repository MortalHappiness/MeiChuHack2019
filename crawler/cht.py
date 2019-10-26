import json
import requests
import time

payloadHeader = {'accept':'application/json', 'Content-Type': 'application/json', 'CK':'PKJ2FK5NBYFA1RCGG8'}

payload = json.dumps({})
response1 = requests.get("https://iot.cht.com.tw/iot/v1/device", data=payload, headers=payloadHeader)

dev_dict = json.loads(response1.text)

counter = 0

for device in dev_dict:
    #print("D "+device.get('id'))
    response2 = requests.get("https://iot.cht.com.tw/iot/v1/device/"+device.get('id')+"/sensor", data=payload, headers=payloadHeader)

    sen_dict = json.loads(response2.text)
    for sensor in sen_dict:
        #print("S "+sensor.get('id'))
        response3 = requests.get("https://iot.cht.com.tw/iot/v1/device/"+device.get('id')+"/sensor/"+sensor.get('id')+"/rawdata", data=payload, headers=payloadHeader)
        print(json.loads(response3.text))
        time.sleep(75e-3)
        counter += 1

print("Count: "+counter)