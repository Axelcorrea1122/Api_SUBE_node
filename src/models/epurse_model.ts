import oracledb, { DBObject_IN } from 'oracledb';
import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';
/* let EPurseClass = async(data) => {

    try {
        
        /// the function formatearJson() add attribute ID in object 'data' because if it don't set give trouble with Obj class of package's oracledb
        
        //return new Obj(data);
    } catch (e) {
        throw e;
    }
}
 */



class EPurseClass extends CardSector {
    constructor(data) {
        super();
        CardSector.DbObjectName = 'EPURSE%ROWTYPE';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_EPURSE';
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

export default EPurseClass;