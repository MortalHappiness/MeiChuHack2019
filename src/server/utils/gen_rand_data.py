# type "python ./src/server/utils/process_data.py" to execute
# ===================================

import random
import os
import json

# ===================================

if not os.path.exists('./data'):
    os.mkdir('./data')
if not os.path.exists('./data/roadlamp'):
    os.mkdir('./data/roadlamp')

sensor_types = ['rad',
                'hum',
                'temp',
                'brightness',
                'co2',
                'so2',
                'pa',
                'wind',
                'uv',
                'lum']

# ===================================
# generate "Device" format
new_devices = list()
for i in range(40):
    device = dict()
    device["id"] = f"Device{i+1}"
    device["sensors"] = [device["id"] + "_" + sensor_type
                         for sensor_type in sensor_types]
    device["additional"] = {"lat": str(random.random() * 100),
                            "lon": str(random.random() * 100)}
    new_devices.append(device)

with open('./data/roadlamp/devices.json', 'w') as fout:
    json.dump(new_devices, fout)

# ===================================
# generate "Sensor" format

new_sensors = list()
for device in new_devices:
    for sensor_type in sensor_types:
        sensor = dict()
        sensor["id"] = device["id"] + "_" + sensor_type
        sensor["device_id"] = device["id"]
        sensor["type"] = sensor_type
        sensor["additional"] = {"lat": str(random.random() * 100),
                                "lon": str(random.random() * 100)}
        new_sensors.append(sensor)

with open('./data/roadlamp/sensors.json', 'w') as fout:
    json.dump(new_sensors, fout)

# ===================================
# generate "Measurement" format
measurement = list()
for device in new_devices:
    for sensor_type in sensor_types:
        for time_idx in range(100):
            data = dict()
            data["sensor_id"] = device["id"] + "_" + sensor_type
            data["time"] = str(time_idx + 1)
            data["value"] = str(random.random() * 10)
            data["additional"] = {"lat": str(random.random() * 100),
                                    "lon": str(random.random() * 100)}
            measurement.append(data)

with open('./data/roadlamp/measurement.json', 'w') as fout:
    json.dump(measurement, fout)
