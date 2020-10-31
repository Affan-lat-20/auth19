const NewCampaign =require('../model/NewCampaign');

exports.addProject = async(req,res,next)=>{
    const newCampaign = new NewCampaign({
        Companyid: {_id:req.params.id},
           //Overview
           overview:{
            projectName:req.body.overview.projectName,
            description:req.body.overview.description

           },
            //prodDetails
            prodDetails:{
                category:req.body.prodDetails.category,
                brand:req.body.prodDetails.brand,
                productDetails:req.body.prodDetails.productDetails,
                region:req.body.prodDetails.region,
                image:req.body.prodDetails.image,
                productName:req.body.prodDetails.productName,
                productURL:req.body.prodDetails.productURL,
                productDescription:req.body.prodDetails.productDescription,
            },
            
            //projectDetails
            projectDetails:{
                medium:req.body.projectDetails.medium,
                frequency:req.body.projectDetails.frequency,
                recurring:req.body.projectDetails.recurring,
                budget:{
                    currency:req.body.projectDetails.budget.currency,
                    range:{
                        min:req.body.projectDetails.budget.range.min,
                        max:req.body.projectDetails.budget.range.max,
                    }

                },
                startDate:req.body.projectDetails.startDate,
                endDate:req.body.projectDetails.endDate,
                primaryAudience:req.body.projectDetails.primaryAudience,
                secondaryAudience:req.body.projectDetails.secondaryAudience,
                age:{
                    range:{
                        min:req.body.projectDetails.age.range.min,
                        max:req.body.projectDetails.age.range.max
                    }
                },
                gender:req.body.projectDetails.gender,
                tagline:req.body.projectDetails.tagline,
                objective:req.body.projectDetails.objective
        
            }    
        });
        try {
            const savednewCampaign = await newCampaign.save();
            res.send(savednewCampaign);
            next();
            
        } catch (error) {
            res.status(400).send(error);
        }
 
    }
    //deleteCampaign
    exports.deleteCampaign =  async(req,res)=>{
 
        NewCampaign.findOne({_id: req.params.id}, function (error, newCampaign){
            console.log("This campaign will get deleted " + newCampaign);
            newCampaign.remove();
            res.send("This campaign is removed "+ newCampaign);
        
        });
    }

       //get all campaign for specific Company//
       exports.allCampaignGet=async(req , res)=> {
        NewCampaign.find({Companyid : req.params.id}).then(function (newCampaign) {
        res.send(newCampaign);
        });
       }

       //get campaign by singleid 
       exports.singleCampaignGet=async(req,res)=>{
        NewCampaign.findOne({_id: req.params.id},function(error,newCampaign){
            console.log("This campaign will get selected "+ newCampaign);
 
            res.send("This Campaign is selected"+ newCampaign);
        });
    }
    
    //get all campaign//
    exports.allCampaignGet=async(req , res)=> {
        NewCampaign.find({}).then(function (newCampaign) {
        res.send(newCampaign);
        });
       }

    //Update newCampaign
 
    exports.updateCampaign =  function (req,res){
        var conditions ={_id: req.params.id};
        NewCampaign.updateOne(conditions, req.body)   
            .then(doc =>{
                if(!doc){
                    return res.status(404).end();}
                    return res.status(200).json(doc);
                })
                .catch(err => next(err));
            
     
    }
