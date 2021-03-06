import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';
import oracledb from 'oracledb';

class RoClass extends CardSector{

    constructor(data) {
        super();
        CardSector.DbObjectName = 'RO%ROWTYPE';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_RO';
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


export default RoClass;
