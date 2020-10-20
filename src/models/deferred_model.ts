import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';
import OrgClass from './org_model';
import BkpClass from './bkp_model';
import oracledb from 'oracledb';
import { DBObject_IN } from 'oracledb';
import OracleDB from 'oracledb';

class DeferredClass extends CardSector{


    constructor(data){
        super();
        CardSector.DbObjectName = 'TARJETA_PACKAGE.DEFERRED_REC';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_DEFERRED';
    }


    public async save(){
        try {

            let obj = {...CardSector.Obj}

            let obj_org = new OrgClass(obj.ORG);
            let r1: any = await obj_org.save();
            let obj_bkp = new BkpClass(obj.BKP);
            let r2: any = await obj_bkp.save();

            CardSector.Obj = obj;
            CardSector.Obj.ORG = r1.ID;
            CardSector.Obj.BKP = r2.ID;
            CardSector.DbObjectName = 'TARJETA_PACKAGE.DEFERRED_REC';
            CardSector.DbFunctionName = 'EXISTS_OR_CREATES_DEFERRED';

            let res = await this.saveSector();
            res.ORG = r1;
            res.BKP = r2;
            return res;

        }catch (err) {
            console.error(err);
            throw err;
        }
    }

}


export default DeferredClass;
