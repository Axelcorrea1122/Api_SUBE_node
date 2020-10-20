import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';
import oracledb from 'oracledb';

class LastUseClass extends CardSector{

    private obj_json;

    constructor(data){
        super();
        CardSector.DbObjectName = 'LAST_USE%ROWTYPE';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_LAST_USE';
    }

    public async save(){
        try {
            let res = await this.saveSector();
            return res;
        }catch (err) {
            console.error(err);
            throw err;
        }
    }
}


export default LastUseClass;
