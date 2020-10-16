const formatearJson = (json, obj) => {
    let keys = Object.keys(obj.prototype.attributes)
    let jsonFormateado = {};
    let i = 1;
    jsonFormateado['ID'] = null;
    for (let key in json) {
        jsonFormateado[`${keys[i]}`] = json[key];
        i++;
    }
    return jsonFormateado;
};


export default formatearJson;