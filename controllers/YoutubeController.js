const YoutubeData = require("../model/YoutubeData");


exports.addyoutubeData = async(req,res,next)=>{
    const youtubedata = new YoutubeData({
        internalUserid: {_id:req.params.id},         
        userId:req.body.userId, 
        country:req.body.country,                           
        description:req.body.description,
        title:req.body.title,
        publishedAt:req.body.publishedAt,
        subscriberCount:req.body.subscriberCount,
        videoCount:req.body.videoCount,
        viewCount:req.body.viewCount
 
    });
        try {
            const savedyoutubedata = await youtubedata.save();
            // console.log(savedUser);
    
            res.send(savedyoutubedata);
            next();
            
        } catch (error) {
            res.status(400).send(error);
        }
 
    }


    exports.getuseryoutubedata=async(req , res)=> {
        YoutubeData.find({internalUserid : req.params.id}).then(function (youtubedata) {
        res.send(youtubedata);
        });
       }


       exports.youtubeedit =  function (req,res){
        var conditions ={_id: req.params.id};
       
        YoutubeData.updateOne(conditions, req.body)   
            .then(doc =>{
                if(!doc){
                    return res.status(404).end();}
                    return res.status(200).json(doc);
                })
                .catch(err => next(err));
            
        
       
        }

        exports.getallyoutubedata=async(req , res)=> {
            YoutubeData.find({}).then(function (YoutubeData) {
            res.send(YoutubeData);
            });
           }
    
           
    exports.getyouspec = async(req,res,next)=>{
        // BrandEmployee.findOne(req.query)
        let query;
        let result = JSON.stringify(req.query);
        result = result.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`);
        console.log(result);
    
        query = YoutubeData.find(JSON.parse(result));
        
        const you = await query
        res
        .status(200)
        .json(you);
        
    }
    