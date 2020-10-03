import oracledb from 'oracledb';
import EPurseClass from './epurse_model';



/* const guardarEPurse = async(data) => {

    let connection: oracledb.Connection;
    let epurse: EPurseClass;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection(`subePool_${process.pid}`);
        let sql: string = `BEGIN :res := TARJETA_PACKAGE.EXISTS_OR_CREATES_EPURSE(:obj); COMMIT; END;`;

        await EPurseClass.initialize();
        epurse = new EPurseClass(data);

        const binds: oracledb.BindParameters = {
            res: {
                type: oracledb.NUMBER,
                dir: oracledb.BIND_OUT
            },
            obj: epurse
        }
        let result: oracledb.Result<unknown> = await connection.execute(sql, binds);
        console.log(result.outBinds);
    } catch (err) {
        console.error(err);
    }
} */

//export default guardarEPurse;