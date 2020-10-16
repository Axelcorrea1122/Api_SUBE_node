let dbconfig = {
    user: /* process.env.NODE_ORACLEDB_USER || */ 'SUBE_LAB_DESA',
    password: /* process.env.NODE_ORACLEDB_PASSWORD || */ 'Correa1122',
    connectString: /* process.env.NODE_ORACLEDB_CONNECTIONSTRING || */ 'localhost/sube',
    poolAlias: null,
    poolMax: 8,
    queueMax: 500
}

let db_access_users = {
    user: 'USERS_ACCESS',
    password: 'Correa1122',
    connectString: 'localhost/sube'
}


export {
dbconfig,
db_access_users
};