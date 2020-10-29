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
                currency:req.body.projectDetails.budget.currency,
                // minValue:req.body.projectDetails.budget.range.min,
                // maxValue:req.body.projectDetails.budget.range.max,
                startDate:req.body.projectDetails.startDate,
                endDate:req.body.projectDetails.endDate,
                primaryAudience:req.body.projectDetails.primaryAudience,
                secondaryAudience:req.body.projectDetails.secondaryAudience,
                minAge:req.body.projectDetails.age.range.min,
                maxAge:req.body.projectDetails.age.range.max,
                // gender:req.body.projectDetails.gender,
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
