import CardSector from '../interfaces/card_sector';
import oracledb from 'oracledb';
import RoClass from './ro_model';
import RwClass from './rw_model';

class AppClass extends CardSector{


    constructor(data){
        super();
        CardSector.DbObjectName = 'TARJETA_PACKAGE.APP_REC';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_APP';
    }


    public async save(){
        try {

            let obj = {...CardSector.Obj};

            let obj_ro = new RoClass(obj.RO);
            let r1: any = await obj_ro.save();
            let obj_rw = new RwClass(obj.RW);
            let r2: any = await obj_rw.save();

            CardSector.Obj = obj;
            CardSector.Obj.RO = r1.ID;
            CardSector.Obj.RW = r2.ID;
            CardSector.DbObjectName = 'TARJETA_PACKAGE.APP_REC';
            CardSector.DbFunctionName = 'EXISTS_OR_CREATES_APP';
            
            let res = await this.saveSector();
            res.RO = r1;
            res.RW = r2;
            return res;
        }catch (err) {
            console.error(err);
            throw err;
        }
    }
}


export default AppClass;
