const express = require("express");
const router = express.Router();


router.post("",(req,res,next)=>{
    const context = new contexts({
        Context: req.body.Context,
        Interested_Parties: req.body.Interested_Parties,
        IP_upload: req.body.IP_upload,
        contexttick: req.body.contexttick,
        IPtick: req.body.IPtick,
        Scopetick: req.body.Scopetick,
        Scope: req.body.Scope,
        ScopeUpload: req.body.ScopeUpload,
    });
    context.save().then(createdPart=>{
        res.status(201).json({
            message: "Context successfully added.",
        
        });
    });
});

module.exports = router;