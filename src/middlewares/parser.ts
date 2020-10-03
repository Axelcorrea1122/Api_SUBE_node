//const bodyParser = require('body-parser');
const bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser);



//let parser = bodyParser.text({ type: 'text/html' })

let parserJSON = bodyParser.json();

let parserXML = bodyParser.xml({
    xmlParseOptions: {
        normalizar: false, //  Recortar espacios en blanco dentro de los nodos de texto      
        normalizeTags: false, //  Transformar etiquetas a minúsculas  
        explicitArray: false, //  Solo coloca nodos en la matriz si> 1
        ignoreAttrs: true
    }
});


export {
    parserJSON,
    parserXML
};