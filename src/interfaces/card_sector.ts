import oracledb, { Results } from 'oracledb';
import formatearJson from '../Utils/utils';
import { DBObject_IN } from 'oracledb';

abstract class CardSector {
    
    static Obj: any
    static DbObjectName: String;
    static DbFunctionName: String;

    constructor(){};

    static async get_instance(objName, data, conn){
            try{
                //let conn = await oracledb.getConnection(`subePool_${process.pid}`);
                CardSector.DbObjectName = objName;
                let instance = await conn.getDbObjectClass(objName);
                data = formatearJson(data, instance);
                let Obj = new instance(data);
                //await conn.close();
                return Obj;
            }catch(err){
                console.log(err);
                throw err;
            }
        }
        

    private findDbFunctionName():void {
        switch(CardSector.DbObjectName){
            case 'ORG%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_ORG';
                break;
            }
            case 'BKP%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_BKP';
                break;
            }
            case 'TARJETA_PACKAGE.DEFERRED_REC': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_DEFERRED';
                break;
            }
            case 'RW%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_RW';
                break;
            }
            case 'RO%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_RO';
                break;
            }
            case 'APP_REC': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_APP';
                break;
            }
            case 'IDX_APP_REC': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_IDX_APP';
                break;
            }
            case 'INTEGRATION%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_INTEGRATION';
                break;
            }
            case 'LAST_USE%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_LAST_USE';
                break;
            }
            case 'TRANSIT_GENERAL_REC': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_TRANSIT_GENERAL';
                break;
            }
            case 'HISTORY_FORMAT%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_HISTORY_FORMAT';
                break;
            }
            case 'HISTORY_REC': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_HISTORY';
                break;
            }
            case 'CARD_INFO%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_CARD_INFO';
                break;
            }
            case 'LOCAL_C%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_LOCAL_C';
                break;
            }
            case 'CARD_INFORMATION_REC': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_CARD_INFORMATION';
                break;
            }
            case 'SGC%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_SGC';
                break;
            }
            case 'CARD_DATA%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_CARD_DATA';
                break;
            }
            case 'EPURSE%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_EPURSE';
                break;
            }
            case 'EPURSE_EXT%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_EPURSE_EXT';
                break;
            }
            case 'TARJETAS_REC': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_TARJETAS';
                break;
            }

        }
    }

    public abstract async save():Promise<Number>;

    public async saveSector(){
        try {
            let conn = await oracledb.getConnection(`subePool_${process.pid}`);
            let db_obj_in = await CardSector.get_instance(CardSector.DbObjectName, 
                                                        CardSector.Obj, conn);
            let sql: string = `BEGIN :res := TARJETA_PACKAGE.${CardSector.DbFunctionName}
                                (:obj); COMMIT; END;`;

            const binds: oracledb.BindParameters = {
                res: {
                    type: oracledb.NUMBER,
                    dir: oracledb.BIND_OUT
                },
                obj: db_obj_in
            }
            let result: oracledb.Result<any> = await conn.execute(sql, binds);
            console.log(result);
            await conn.close();
            return result.outBinds.res
        }catch (err) {
            console.error(err);
            throw err;
        }
    }
}


export default CardSector;