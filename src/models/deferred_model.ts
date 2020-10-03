import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';

class BkpClass extends CardSector{

    constructor(data) {
        super();
        CardSector.DbObjetName = 'BKP%ROWTYPE';
        CardSector.initialize(CardSector.DbObjetName).then(()=>{
            
            data = formatearJson(data, Object.keys(CardSector.proto.prototype.attributes));
            let instance = CardSector.proto; //SE PIDE EL MODELO DEL OBJETO DEFINIDO EN ORABLE
            CardSector.Obj = new instance(data);

        }).catch(err => {
            console.log(err);
            throw err;
        })
    }
}


export default BkpClass;
