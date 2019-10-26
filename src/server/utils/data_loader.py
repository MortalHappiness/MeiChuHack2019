import os
import json

# ==================================

class DataLoader:
    """
    Data loader for sending data to frond end.
    """
    def __init__(self, datafolder, device_name):
        with open(os.path.join(datafolder,
                               device_name,
                               'devices.json')) as fin:
            devices = json.load(fin)

        with open(os.path.join(datafolder,
                               device_name,
                               'sensors.json')) as fin:
            sensors = json.load(fin)

        with open(os.path.join(datafolder,
                               device_name,
                               'measurement.json')) as fin:
            measurement = json.load(fin)

        # auxiliary hash tables for quick search
        devices_id_to_idx = dict()
        for i in range(len(devices)):
            devices_id_to_idx[devices[i]["id"]] = i

        sensors_id_to_idx = dict()
        for i in range(len(sensors)):
            sensors_id_to_idx[sensors[i]["id"]] = i

        sensor_id_to_timestamps = dict()
        for data in measurement:
            sensor_id_to_timestamps.setdefault(
                data["sensor_id"], list()).append(data)

        # mapping datatype to sensors id
        datatypes = [x.split("_")[1] for x in devices[0]["sensors"]]
        datatype_to_sensor_ids = dict()
        for k in datatypes:
            datatype_to_sensor_ids[k] = list()
        for sensor in sensors:
            k = sensor["id"].split("_")[1]
            if k in datatypes:
                datatype_to_sensor_ids[k].append(sensor["id"])

        # store them as attributes
        self.devices = devices
        self.sensors = sensors
        self.measurement = measurement
        self.datatypes = datatypes
        self.devices_id_to_idx = devices_id_to_idx
        self.sensors_id_to_idx = sensors_id_to_idx
        self.sensor_id_to_timestamps = sensor_id_to_timestamps
        self.datatype_to_sensor_ids = datatype_to_sensor_ids

    def get_device_id(self):
        return [device["id"] for device in self.devices]

    def get_datatypes(self):
        return self.datatypes

    def get_position_by_datatype(self, datatype):
        """
        Arguments:
            datatype(str): The datatype

        Returns:
            Array of information containing latitude, longitude,
            and the measurement value.

            [
                {"lat": float,
                 "lon": float,
                 "value": int or float
                }
            ]
        """
        ans = list()
        sensor_ids = self.datatype_to_sensor_ids[datatype]
        for sensor_id in sensor_ids:
            information = dict()
            sensor_idx = self.sensors_id_to_idx[sensor_id]
            sensor = self.sensors[sensor_idx]
            device_id = sensor["device_id"]
            device_idx = self.devices_id_to_idx[device_id]
            device = self.devices[device_idx]
            try:
                information["lat"] = device["additional"]["lat"]
                information["lon"] = device["additional"]["lon"]
            except KeyError:
                continue
            timestamps = self.sensor_id_to_timestamps[sensor_id]
            information["value"] = timestamps[-1]["value"]
            ans.append(information)
        return ans

    def datatype_to_timestamps_n(self, device_id, datatypes, n):
        device_idx = self.devices_id_to_idx[device_id]
        device = self.devices[device_idx]
        datatype_to_timestamps = dict()
        for sensor_id in device["sensors"]:
            datatype = sensor_id.split("_")[1]
            if datatype in datatypes:
                timestamps = self.sensor_id_to_timestamps[sensor_id]
                datatype_to_timestamps[datatype] = timestamps[-n:]
        return datatype_to_timestamps

    def get_n_lateset_data(self, device_id, datatypes, n):
        """
        Arguments:
            device_id(str): The device id
            datatypes(list of str): list of datatypes
            n(int): The number of latest data requested.

        Returns:
            Array containing datas in time order.

            [
                {
                    key of datatypes: corresponding value
                }
            ]
        """
        for datatype in datatypes:
            if datatype not in self.datatypes:
                raise Exception("Invalid datatype query!")

        datatype_to_timestamps = self.datatype_to_timestamps_n(
                                      device_id, datatypes, n)

        ans = [dict() for _ in range(n)]
        for i in range(n):
            for k, v in datatype_to_timestamps.items():
                ans[i][k] = v[i]["value"]

        return ans

    def get_download_file(self, device_id, datatypes, n, fmt):
        """
        Arguments:
            device_id(str): The device id
            datatypes(list of str): list of datatypes
            n(int): The number of latest data requested.
            fmt(str): The file format to be downloaded.

        Returns:
            Depends on the format.

            "csv": 2-d array
            "json": json string
        """
        for datatype in datatypes:
            if datatype not in self.datatypes:
                raise Exception("Invalid datatype query!")

        datatype_to_timestamps = self.datatype_to_timestamps_n(
                                      device_id, datatypes, n)

        if fmt == "csv":
            ans = list()
            ans.append([""] + datatypes)
            for i in range(n):
                ans.append([str(i + 1)] +
                           [datatype_to_timestamps[datatype][i]["value"][0]
                            for datatype in datatypes])
            return ans
        elif fmt == "json":
            ans = dict()
            device = self.devices[self.devices_id_to_idx[device_id]]
            ans = device.copy()
            ans["sensors"] = list()
            for sensor_id in device["sensors"]:
                datatype = sensor_id.split("_")[1]
                if datatype not in datatypes:
                    continue
                sensor_idx = self.sensors_id_to_idx[sensor_id]
                sensor = self.sensors[sensor_idx]
                sensor_copy = sensor.copy()
                timestamps = datatype_to_timestamps[datatype]
                sensor_copy["data"] = [timestamp["value"][0]
                                       for timestamp in timestamps]
                ans["sensors"].append(sensor_copy)
            return ans
        else:
            raise ValueError('Invalid value for "fmt"!')
