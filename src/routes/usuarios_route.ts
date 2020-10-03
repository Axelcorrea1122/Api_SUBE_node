import express from 'express';
const router = express.Router();
import { parserJSON } from '../middlewares/parser';
import oracledb from 'oracledb';
import { dbconfig } from '../db/db_config';
import bcrypt from 'bcrypt';
import { verificaToken, verificaAdminRole } from '../middlewares/authentication';
import OracleDB from 'oracledb';

//middlewares



router.post('/usuario', /* [verificaToken, verificaAdminRole, */ parserJSON /* ] */ , async(req, res) => {


    console.log(req.body);
    try {
        let binds: oracledb.BindParameters = {
            nombre: req.body.user,
            password: bcrypt.hashSync(req.body.password, 10),
            rol: req.body.rol
        }
        let connection: oracledb.Connection = await oracledb.getConnection(dbconfig);

        oracledb.autoCommit = true;
        await connection.execute('INSERT INTO USERS_ACCESS.USERS(NOMBRE, PASSWORD, ROLE) VALUES(:nombre, :password, :rol)', binds);

        res.json({
            message: 'Usuario agregado',
            usuario: binds
        })
    } catch (e) {
        console.log(e);
    }

})


export default router;