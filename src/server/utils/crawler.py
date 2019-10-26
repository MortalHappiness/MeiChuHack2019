import json
import requests
import time
import os

# ==========================================

def get_devices(key, data_path, device_name = "roadlamp"):
    """
    Get devices information and save them as
    ../../../data/{device_name}/index.js

    Attributes:
        key(string): The key for the project.
        data_path(string): The path to the data folder.
        device_name: The name of the device.

    Format for index.js:
        Array of devices

    Note:
        Used as proprocessing.
    """
    if not (os.path.exists(data_path)):
        os.mkdir(data_path)
    if not (os.path.exists(os.path.join(data_path, device_name))):
        os.mkdir(os.path.join(data_path, device_name))

def get_sensors_attributes(key, data_path, device_name = "roadlamp"):
    """
    Get sensors attributes for each devices and save them as
    ../../../data/{device_name}/sensors.js

    Attributes:
        key(string): The key for the project.
        data_path(string): The path to the data folder.
        device_name: The name of the device.

    Format for index.js:
        Array of array of sensors(attributes)

    Note:
        Only used for demo.
    """
    if not (os.path.exists(data_path)):
        os.mkdir(data_path)
    if not (os.path.exists(os.path.join(data_path, device_name))):
        os.mkdir(os.path.join(data_path, device_name))

def get_sensors_values(key, data_path, device_name = "roadlamp"):
    """
    Get sensors values for each devices and return them.

    Attributes:
        key(string): The key for the project.
        data_path(string): The path to the data folder.
        device_name: The name of the device.

    Returns:
        Array of array of sensors(values)

    Note:
        Use this function for real use.
    """
    if not (os.path.exists(data_path)):
        os.mkdir(data_path)
    if not (os.path.exists(os.path.join(data_path, device_name))):
        os.mkdir(os.path.join(data_path, device_name))

def get_sensor_history_values(key, data_path, device_name, start, end):
    """
    Get sensors values for each devices in the specified time
    interval and save them as
    ../../../data/{device_name}/sensors_history.js

    Attributes:
        key(string): The key for the project.
        data_path(string): The path to the data folder.
        device_name: The name of the device.
        start(string): The start time of the time interval.
        end(string): The end time of the time interval.

    Format for index.js:
        Array of array of sensors(attributes)

    Note:
        Only used for demo.
    """
    if not (os.path.exists(data_path)):
        os.mkdir(data_path)
    if not (os.path.exists(os.path.join(data_path, device_name))):
        os.mkdir(os.path.join(data_path, device_name))

# =======================================

if __name__ == "__main__":
    get_devices("1", "./data")
