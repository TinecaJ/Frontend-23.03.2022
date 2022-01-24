const express = require("express");
const router = express.Router();


router.post("",(req,res,next)=>{
    const pcPart = new PcPart({
        type: req.body.type,
        brand: req.body.brand,
        spec: req.body.spec,
        quantity: req.body.quantity,
        unit_cost: req.body.unit_cost,
    });
    pcPart.save().then(createdPart=>{
        res.status(201).json({
            message: "Pc Part successfully added.",
        
        });
    });
});

module.exports = router;