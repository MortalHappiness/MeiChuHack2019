const MAP_X = 100;
const MAP_Y = 100;
const offset = 10
const data = Array(30).fill(0).map(
    (itm, idx) => `device${itm + idx}`).map(
        itm => ({
            name: itm,
            x: Math.floor(MAP_X * Math.random()) + 1,
            y: Math.floor(MAP_Y * Math.random()) + 1,
            value: offset * Math.random()
        })
);


export { MAP_X, MAP_Y, data };