# type "python ./src/server/utils/process_data.py" to execute
# ===================================
import os
import json
import time

# ===================================

with open('./raw_data/roadlamp/index.json') as fin:
    devices = json.load(fin)

with open('./raw_data/roadlamp/sensors.json') as fin:
    sensors = json.load(fin)

with open('./raw_data/roadlamp/sensors_history.json') as fin:
    sensors_history = json.load(fin)

# ===================================

if not os.path.exists('./data'):
    os.mkdir('./data')
if not os.path.exists('./data/roadlamp'):
    os.mkdir('./data/roadlamp')

# ===================================
# parse into "Device" format
new_devices = list()
for i in range(len(devices)):
    device = dict()
    device["id"] = devices[i]["id"]
    device["sensors"] = [devices[i]["id"] + "_" + sensor["id"]
                         for sensor in sensors[i]]
    device["additional"] = dict((k, devices[i][k])
                                for k in devices[i] if k != "id")
    new_devices.append(device)

with open('./data/roadlamp/devices.json', 'w') as fout:
    json.dump(new_devices, fout)

# ===================================
# parse into "Sensor" format

new_sensors = list()
for i in range(len(sensors)):
    for j in range(len(sensors[i])):
        sensor = dict()
        sensor["id"] = devices[i]["id"] + "_" + sensors[i][j]["id"]
        sensor["device_id"] = devices[i]["id"]
        sensor["type"] = sensors[i][j]["type"]
        sensor["additional"] = dict((k, sensors[i][j][k])
                                for k in sensors[i][j]
                                if k not in ["id", "type"])
        new_sensors.append(sensor)

with open('./data/roadlamp/sensors.json', 'w') as fout:
    json.dump(new_sensors, fout)

# ===================================
# parse into "Measurement" format
measurement = list()
for i in range(len(devices)):
    for sensor_history in sensors_history[i]:
        for history in sensor_history:
            data = dict()
            data["sensor_id"] = devices[i]["id"] + "_" + history["id"]
            data["time"] = history["time"]
            data["value"] = history["value"]
            data["additional"] = dict((k, history[k])
                                    for k in history
                                    if k not in ["id", "time", "value"])
            measurement.append(data)

with open('./data/roadlamp/measurement.json', 'w') as fout:
    json.dump(measurement, fout)
