# type "python ./src/server/utils/crawler.py" to execute
# ===================================
import os
import json
import time
import requests

# ===================================

def get_devices(key, data_path, device_name = "roadlamp"):
    """
    Get devices information and save them as
    {data_path}/{device_name}/index.json
    Attributes:
        key(string): The key for the project.
        data_path(string): The path to the data folder.
        device_name: The name of the device.
    Format for index.json:
        Array of devices
    Note:
        Used as proprocessing.
    """
    if not (os.path.exists(data_path)):
        os.mkdir(data_path)
    if not (os.path.exists(os.path.join(data_path, device_name))):
        os.mkdir(os.path.join(data_path, device_name))

    header = {'CK':key}
    dev_list = []
    res = requests.get('https://iot.cht.com.tw/iot/v1/device', headers=header)
    for dev in json.loads(requests.get('https://iot.cht.com.tw/iot/v1/device', headers=header).text):
        dev_list += [dev]
    with open(os.path.join(data_path, device_name, 'index.json'), 'w') as file:
        json.dump(dev_list, file)

def get_sensors_attributes(key, data_path, device_name = "roadlamp"):
    """
    Get sensors attributes for each devices and save them as
    {data_path}/{device_name}/sensors.json
    Attributes:
        key(string): The key for the project.
        data_path(string): The path to the data folder.
        device_name: The name of the device.
    Format for index.json:
        Array of array of sensors(attributes)
    Note:
        Only used for demo.
    """
    if not (os.path.exists(data_path)):
        os.mkdir(data_path)
    if not (os.path.exists(os.path.join(data_path, device_name))):
        os.mkdir(os.path.join(data_path, device_name))

    header = {'CK':key}
    with open(os.path.join(data_path, device_name, 'index.json')) as fin:
        dev_list = json.load(fin)
    sen_list_list = []
    for dev in dev_list:
        sen_list = []
        for sen in json.loads(requests.get('https://iot.cht.com.tw/iot/v1/device/'+dev.get('id')+'/sensor', headers=header).text):
            sen_list += [sen]
        sen_list_list += [sen_list]
    with open(os.path.join(data_path, device_name, 'sensors.json'), 'w') as file:
        json.dump(sen_list_list, file)

def get_sensor_history_values(key, data_path, device_name, start, end):
    """
    Get sensors values for each devices in the specified time
    interval and save them as
    {data_path}/{device_name}/sensors_history.json
    Attributes:
        key(string): The key for the project.
        data_path(string): The path to the data folder.
        device_name: The name of the device.
        start(string): The start time of the time interval.
        end(string): The end time of the time interval.
    Format for index.json:
        Array of array of array of sensors(attributes)
    Note:
        Only used for demo.
    """
    if not (os.path.exists(data_path)):
        os.mkdir(data_path)
    if not (os.path.exists(os.path.join(data_path, device_name))):
        os.mkdir(os.path.join(data_path, device_name))

    header = {'CK':key}
    with open(os.path.join(data_path, device_name, 'index.json')) as fp:
        dev_list = json.load(fp)
    with open(os.path.join(data_path, device_name, 'sensors.json')) as fp:
        sen_list = json.load(fp)
    val_list_list = []
    for dev, sens in zip(dev_list, sen_list):
        val_list = []
        for sen in sens:
            print(type(dev),type(sen))
            if(type(dev)=="str" or type(sen)=="str"):
                print(dev)
                print(sen)
            print('https://iot.cht.com.tw/iot/v1/device/'+dev['id']+'/sensor/'+sen['id'])
            while True:
                response_json = json.loads(requests.get('https://iot.cht.com.tw/iot/v1/device/'+dev.get('id')+'/sensor/'+sen.get('id')+'/rawdata?start='+start+'&end='+end, headers=header).text)
                time.sleep(0.02)
                if ('status' not in response_json):
                    break
                time.sleep(0.1)
            val_list += [response_json]
            print(val_list[-1])
        val_list_list += [val_list]
    with open(os.path.join(data_path, device_name, 'sensors_history.json'), 'w') as file:
        json.dump(val_list_list, file)

# =======================================

if __name__ == "__main__":
    prjCK = "PKJ2FK5NBYFA1RCGG8"
    get_devices(prjCK, "./raw_data")
    get_sensors_attributes(prjCK, "./raw_data")
    get_sensor_history_values(prjCK, "./raw_data", "roadlamp", "2019-04-01T00:00:00Z", "2019-05-01T00:00:00Z")
