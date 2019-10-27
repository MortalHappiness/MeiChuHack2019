const fillMap = (data, MAP_X, MAP_Y) => {
    const filled = Array(MAP_Y + 1).fill(null).map(itm => Array(MAP_X + 1).fill(null));
    //console.log(filled);
    data.map(obj => {
        filled[Math.floor(obj.lat)][Math.floor(obj.lon)] = obj.value;
    });
    console.log(filled);
    return filled;
}

function download_file(response, filename, format) {
    let content;
    switch(format) {
        case 'csv':
            content = "data:text/csv;charset=utf-8," 
                    + response.map(e => e.join(",")).join("\r\n");
            break;
        case 'json':
            content = "data:application/json;charset=utf-8," 
                    + JSON.stringify(response);
            break;
    }
    let link = document.createElement("a");
    link.setAttribute("href", encodeURI(content));
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}

export { fillMap, download_file};