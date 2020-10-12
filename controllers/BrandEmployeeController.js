const BrandEmployee = require('../model/BrandEmployee');


exports.registerEmployee = async(req,res)=>{
    const brandemployee = new BrandEmployee({
        Companyid: {_id:req.params.id},
            employee:{
                employeeName:req.body.employee.employeeName,
                employeeEmail: req.body.employee.employeeEmail,
                employeePassword: req.body.employee.employeePassword,
                employeePhoneNumber: req.body.employee.employeePhoneNumber,
                employeeRole: req.body.employee.employeeRole

            }
    });
        try {
            const savedbrandemp = await brandemployee.save();
            // console.log(savedUser);
    
            res.send(savedbrandemp);
            
        } catch (error) {
            res.status(400).send(error);
        }

    }
    exports.employeeDelete =  async(req,res)=>{

        BrandEmployee.findOne({_id: req.params.id}, function (error, brandemployee){
            console.log("This object will get deleted " + brandemployee);
            
            brandemployee.remove();
            res.send("This user is removed "+ brandemployee);
        
        });
    }

    exports.employeeGet=async(req,res)=>{
        BrandEmployee.findOne({_id: req.params.id},function(error,brandemployee){
            console.log("This user will get selected "+ brandemployee);

            res.send("This user is selected");
        });
    }

    

    // exports.employeeEdit=async(req,res)=>{
    //     BrandEmployee.findOne({_id: req.params.id},function(error,brandemployee){
    //         console.log("This user will be Updated " +brandemployee);

    //         BrandEmployee.UpdateOne();
    //         res.send("This user is updated" +brandemployee);
        
    //     });
    // }
    
    exports.employeeEdit =  function (req,res){
        var conditions ={_id: req.params.id};
            BrandEmployee.updateOne(conditions, req.body)   
            .then(doc =>{
                if(!doc){
                    return res.status(404).end();}
                    return res.status(200).json(doc);
                })
                .catch(err => next(err));
            
     
    }
       
        
    

    