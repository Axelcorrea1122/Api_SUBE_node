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

            let obj_def = {
                DbOjectName: CardSector.DbObjectName,
                Obj: CardSector.Obj,
                DbFunctionName: CardSector.DbFunctionName
            }

            let obj_org = new OrgClass(obj_def.Obj.ORG);
            let r1 = await obj_org.save();
            let obj_bkp = new BkpClass(obj_def.Obj.BKP);
            let r2 = await obj_bkp.save();

            obj_def.Obj.ORG = r1;
            obj_def.Obj.BKP = r2;
            CardSector.Obj = obj_def.Obj;
            CardSector.DbObjectName = 'TARJETA_PACKAGE.DEFERRED_REC';
            CardSector.DbFunctionName = 'EXISTS_OR_CREATES_DEFERRED';
            
            let res = this.saveSector();

            return res;

        }catch (err) {
            console.error(err);
            throw err;
        }
    }

}


export default DeferredClass;
