import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';
import oracledb from 'oracledb';

class BkpClass extends CardSector{

    private obj_json;

    constructor(data){
        super();
        CardSector.DbObjectName = 'BKP%ROWTYPE';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_BKP';
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


export default BkpClass;
