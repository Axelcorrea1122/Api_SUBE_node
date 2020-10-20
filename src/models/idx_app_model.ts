import CardSector from '../interfaces/card_sector';
import oracledb from 'oracledb';
import RoClass from './ro_model';
import RwClass from './rw_model';

class IdxAppClass extends CardSector{


    constructor(data){
        super();
        CardSector.DbObjectName = 'TARJETA_PACKAGE.IDX_APP_REC';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_IDX_APP';
    }


    public async save(){
        try {
            let res = this.saveSector();

            return res;
        }catch (err) {
            console.error(err);
            throw err;
        }
    }

}


export default IdxAppClass;
