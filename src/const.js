const deviceIDs = Array(40).fill(0).map((itm, idx) => `Device${idx + 1}`);
const datatypes = [
    "temp",
    "lum",
    "co2",
    "so2",
    "pa",
    "wind",
    "uv",
    "hum",
    "rad"
];
export { deviceIDs, datatypes };