import express from 'express';
const router = express.Router();
import { parserJSON } from '../middlewares/parser';
import oracledb from 'oracledb';
import { dbconfig } from '../db/db_config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


router.post('/login', parserJSON, async(req, res) => {
    try {
        let connection: oracledb.Connection = await oracledb.getConnection(`subePool_${process.pid}`);

        let bind: oracledb.BindParameters = {
            nombre: req.body.user
        };

        let result: oracledb.Result<unknown> = await connection.execute('select * from USERS_ACCESS.USERS WHERE NOMBRE = :nombre', bind);

        if (result.rows.length == 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectas'
                }
            })
        }

        let usuario = {
            user: result.rows[0][1],
            password: result.rows[0][2],
            rol: result.rows[0][3]
        }

        if (!bcrypt.compareSync(req.body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectas'
                }
            })
        }

        let token: string = jwt.sign({
            usuario
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        await connection.close();

        return res.json({
            ok: true,
            user: usuario.user,
            token
        })

    } catch (e) {
        console.log(e);
    }
})

export default router;
