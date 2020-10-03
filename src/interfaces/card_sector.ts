import oracledb from 'oracledb';

abstract class CardSector {
    static proto: oracledb.DBObjectClass<unknown>;
    static conn: oracledb.Connection;
    static Obj: oracledb.DBObject_IN<unknown>;
    static DbObjetName: String;
    static DbFunctionName: String;

    constructor(){};

    static async initialize(obj):Promise<void>{
        CardSector.conn = await oracledb.getConnection(`subePool_${process.pid}`);
        CardSector.proto = await CardSector.conn.getDbObjectClass(obj);
    }

    private findDbFunctionName():void {
        switch(CardSector.DbObjetName){
            case 'ORG%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_ORG';
                break;
            }
            case 'BKP%ROWTYPE': {
                CardSector.DbFunctionName = 'EXISTS_OR_CREATES_BKP';
                break;
            }
            case 'DEFERRED_REC': {
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

    public async save(): Promise<Boolean>{
        try {

            await CardSector.initialize(CardSector.DbObjetName);
            this.findDbFunctionName();
            let sql: string = `BEGIN :res := TARJETA_PACKAGE.${CardSector.DbFunctionName}(:obj); COMMIT; END;`;

            const binds: oracledb.BindParameters = {
                res: {
                    type: oracledb.NUMBER,
                    dir: oracledb.BIND_OUT
                },
                obj: CardSector.Obj
            }
            let result: oracledb.Result<unknown> = await CardSector.conn.execute(sql, binds);
            
            console.log(result);
            return true;

        }catch (err) {
            console.error(err);
            throw err;
        }
    };
}


export default CardSector;