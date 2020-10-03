import express from 'express';
import { parserXML } from '../middlewares/parser';
const router = express.Router();
//import guardarEnEPurse from '../models/tarjeta_model';
import { verificaToken } from '../middlewares/authentication';
import EPurseClass from '../models/epurse_model';
import { DBObject_IN } from 'oracledb';
import BkpClass from '../models/bkp_model';
import OrgClass from '../models/org_model';



router.put('/', verificaToken, parserXML, async(req, res) => {
    let org_json: JSON = req.body.TarjetaM2.Deferred.ORG;
    let orgObj = new OrgClass(org_json);

    await orgObj.save();

    res.json({
        ok: true,
        status: 200,
        Obj: org_json
    })
    
    /* let epurse_json: JSON = req.body.TarjetaM2.ePurse;
    //await guardarEnEPurse(ePurse);
    let epurse_obj =  new EPurseClass(epurse_json);
    await epurse_obj.save();
    res.send(epurse_json); */
})

export default router;