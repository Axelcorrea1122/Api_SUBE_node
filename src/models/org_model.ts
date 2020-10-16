import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';
import oracledb, { DBObjectClass } from 'oracledb';
import { DBObject_IN } from 'oracledb';

class OrgClass extends CardSector {

    constructor(data) {
        super();
        CardSector.DbObjectName = 'ORG%ROWTYPE';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_ORG';
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


export default OrgClass;
