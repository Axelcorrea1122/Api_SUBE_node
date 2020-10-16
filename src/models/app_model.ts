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

            let obj_app = {
                DbOjectName: CardSector.DbObjectName,
                Obj: CardSector.Obj,
                DbFunctionName: CardSector.DbFunctionName
            }

            let obj_ro = new RoClass(obj_app.Obj.RO);
            let r1 = await obj_ro.save();
            let obj_rw = new RwClass(obj_app.Obj.RW);
            let r2 = await obj_rw.save();

            obj_app.Obj.RO = r1;
            obj_app.Obj.RW = r2;
            CardSector.Obj = {...obj_app};
            CardSector.DbObjectName = 'TARJETA_PACKAGE.APP_REC';
            CardSector.DbFunctionName = 'EXISTS_OR_CREATES_APP';
            
            let res = this.saveSector();

            return res;
        }catch (err) {
            console.error(err);
            throw err;
        }
    }

}


export default AppClass;
