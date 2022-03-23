const express = require("express");
const router = express.Router();


router.post("",(req,res,next)=>{
    const role = new roles({
        Job_title: req.body.Job_title,
        Responsibility: req.body.Responsibility,
        Position: req.body.Position,
        Name: req.body.Name
        
    });
    role.save().then(createdPart=>{
        res.status(201).json({
            message: "Role successfully added.",
        
        });
    });
});

module.exports = router;