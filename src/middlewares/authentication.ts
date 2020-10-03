import jwt from 'jsonwebtoken';


let verificaToken = (req, res, next) => {
    let token: string = req.get('token'); //se obtiene token del header de la solicitud

    jwt.verify(token, process.env.SEED, (err, decode: any) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decode.usuario;
        console.log(token);
        next();
    })
}


let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.rol === 'ADMIN') {
        return next();
    }

    return res.json({
        ok: false,
        err: {
            message: 'El usuario no es administrador'
        }
    });
}


export {
    verificaToken,
    verificaAdminRole
}

