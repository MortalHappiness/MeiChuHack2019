function download_file(response, filename, format) {
    let content;
    switch(format) {
        case 'csv':
            arr2d = JSON.parse(response);
            content = "data:text/csv;charset=utf-8," 
                    + arr2d.map(e => e.join(",")).join("\r\n");
            break;
        case 'json':
            content = "data:application/json;charset=utf-8," 
                    + response;
            break;
    }
    let link = document.createElement("a");
    link.setAttribute("href", encodeURI(content));
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}