require('../config/config');
import express from 'express';
const app = express();
import { initPool } from '../db/db';
import { dbconfig } from '../db/db_config';

import cluster from 'cluster';
const numCPUs = require('os').cpus().length;

import tarjetasRoute from '../routes/tarjetas_route';
import loginRoute  from '../routes/login_route';
import usuariosRoute from '../routes/usuarios_route';

app.set('trust proxy', true);

//middlewares

app.use('/tarjetas', tarjetasRoute);
app.use('/tarjetas', loginRoute);
app.use('/tarjetas', usuariosRoute);


if (cluster.isMaster) {
    console.log("this is the master process:", process.pid);
    for (let i: number = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    dbconfig.poolAlias = `subePool_${process.pid}`;
    initPool(dbconfig).then(() => {
        app.listen('3000', () => console.log(`Escuchando en puerto ${process.env.PORT} con Worker: ${process.pid}`));
    });
}