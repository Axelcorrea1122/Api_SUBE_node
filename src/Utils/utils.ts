const formatearJson = (json, keys) => {
    let jsonFormateado = {};
    let i = 1;
    jsonFormateado['ID'] = null;
    for (let key in json) {
        jsonFormateado[`${keys[i]}`] = json[key];
        i++;
    }
    return jsonFormateado;
};

const recorrerJson = (json: JSON, keys: Array<any>) => {
    
}

export default formatearJson;