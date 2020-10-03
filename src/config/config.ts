process.env.PORT = process.env.PORT || '3000'; //puerto

/* UN TIP PARA EL POSTMAN ES CREAR AMBIENTES UNO DE PRODUCCION Y OTRO DE DESARROLLO PARA PONER EN LA URL {{url}}/usuario y elegimos el ambiente donde queremos mandar la peticion */



// ==================
//  ENTORNO
//===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==================
//  EXPIRACION TOKEN
//===================
process.env.CADUCIDAD_TOKEN = '24h';


// ==================
//  SEED
//===================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';