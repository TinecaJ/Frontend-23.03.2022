const usersModel= require('../models/users.model'); //calling the users schema created 
const rolesModel= require('../models/roles.model'); //calling the users schema created 

exports.get_confirmation= (req, res, next) => {
    res.send('User route sucessful');
}

exports.get_users = (req, res, next) => {

  //How to save data 
  usersModel.find({}).populate('RoleID').exec(function (err, response) {
    if (err)
      res.send(err);

    else
      res.send({ resultsfounds: response.length, users: response });

  });

}

exports.get_add =(req, res, next) =>{
    //create the data that should be added
      let newusers= new usersModel({
        Name: req.body.Name,
        email: req.body.email,
        password: req.body.password,
        Signature: req.body.Signature,
        role:req.body.role
      });
    //How to save data 
      newusers.save(function(err, newusers){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newusers});
    
    
      });
      
    }


    exports.get_username= (req, res, next)=> {
        const username = req.query.Name
         //How to save data 
           usersModel.find({Name: username},function(err, response){
             if(err)
             res.send(err);
             else
             res.send({resultsfounds:response.length, users: response});
      
           });
      
          }

    exports.get_userbyID= (req, res, next) => {
            const userid = req.query.id
             //How to save data 
               usersModel.findById(userid,function(err, response){
                 if(err)
                 res.send(err);
                 else
                 res.send({resultsfounds:response.length, users: response});
          
               });
          
              }

    exports.get_newpassword=(req, res, next)=> {
        const passn = req.query.Password;
        //How to save data 
        usersModel.findOneAndUpdate({ Name: "Missy Franc" }, { Password: passn }, function (err, response) {
            if (err)
                res.send(err);

            else
                res.send({ resultsfounds: response.length, users: response });

        });

    }

    exports.get_newpasswordbyID= (req, res, next) => {
                    const Id = req.query.userId;
                    const pword = req.query.Password;
                     //How to save data 
                       usersModel.findByIdAndUpdate(Id, {Password: pword}, function(err, response){
                         if(err)
                         res.send(err);
                         else
                         res.send({resultsfounds:response.length, users: response});
                  
                       });
                  
                      }

    
    exports.get_delete = (req, res, next) => {
                        const Id = req.query.userId;
                        
                         //How to save data 
                           usersModel.findByIdAndDelete(Id, function(err, response){
                             if(err)
                             res.send(err);
                             else
                             res.send({resultsfounds:response.length, users: response});
                      
                           });
                      
                          }