import express from 'express';
import { parserXML } from '../middlewares/parser';
const router = express.Router();
//import guardarEnEPurse from '../models/tarjeta_model';
import { verificaToken } from '../middlewares/authentication';
import EPurseClass from '../models/epurse_model';
import { DBObject_IN } from 'oracledb';
import BkpClass from '../models/bkp_model';
import OrgClass from '../models/org_model';
import DeferredClass from '../models/deferred_model';
import RoClass from '../models/ro_model';
import RwClass from '../models/rw_model';
import AppClass from '../models/app_model';



router.put('/', verificaToken, parserXML, async(req, res) => {
        
        try{
            let deferred_json: JSON = req.body.TarjetaM2.Deferred;
            console.log("Termine json")
            let deferredObj = new DeferredClass(deferred_json);
            console.log("Termine creacion obj");
            let result = await deferredObj.save();
            console.log("termine de guardar");
            console.log(result);
    
        }catch(err){
            console.log(err);
            return res.json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            status: 200,

    })
    
    /* let epurse_json: JSON = req.body.TarjetaM2.ePurse;
    //await guardarEnEPurse(ePurse);
    let epurse_obj =  new EPurseClass(epurse_json);
    await epurse_obj.save();
    res.send(epurse_json); */
})

export default router;