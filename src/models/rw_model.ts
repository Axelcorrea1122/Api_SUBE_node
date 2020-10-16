import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';
import oracledb from 'oracledb';

class RwClass extends CardSector{

    constructor(data) {
        super();
        CardSector.DbObjectName = 'RW%ROWTYPE';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_RW';
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


export default RwClass;
