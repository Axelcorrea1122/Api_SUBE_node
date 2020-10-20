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
import IdxAppClass from '../models/idx_app_model';
import IntegrationClass from '../models/integration_model';
import LastUseClass from '../models/last_use_model';



router.put('/', verificaToken, parserXML, async(req, res) => {
        
        try{
            let app_json: JSON = req.body.TarjetaM2.App1;
            console.log("Termine json");
            let appObj = new AppClass(app_json);
            console.log("Termine creacion obj");
            let result = await appObj.save();
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