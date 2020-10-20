import formatearJson from '../Utils/utils';
import CardSector from '../interfaces/card_sector';
import oracledb from 'oracledb';
import { type } from 'os';
import { Console } from 'console';

class IntegrationClass extends CardSector{

    private obj_json;

    constructor(data){
        super();
        CardSector.DbObjectName = 'INTEGRATION%ROWTYPE';
        CardSector.Obj = data;
        CardSector.DbFunctionName = 'EXISTS_OR_CREATES_INTEGRATION';
    }

    public async save(){
        try {
            console.log(CardSector.Obj);
            
            if( CardSector.Obj.Transfer_Bit == 'false' )
                CardSector.Obj.Transfer_Bit = '0';
            else
                CardSector.Obj.Transfer_Bit = '1';
            let res = await this.saveSector();
            return res;
        }catch (err) {
            console.error(err);
            throw err;
        }
    }
}


export default IntegrationClass;
