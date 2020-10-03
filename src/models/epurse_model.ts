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
        CardSector.DbObjetName = 'EPURSE%ROWTYPE';
        CardSector.initialize(CardSector.DbObjetName).then( () => {
            data = formatearJson(data, Object.keys(CardSector.proto.prototype.attributes));
            let instance = CardSector.proto;
            CardSector.Obj = new instance(data);

        }).catch( err =>{
            console.log(err)
            throw err;
        });

    }

}

export default EPurseClass;