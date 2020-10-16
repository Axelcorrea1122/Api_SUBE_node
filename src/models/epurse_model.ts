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
    public async save(){
        return 1;
    }

}

export default EPurseClass;