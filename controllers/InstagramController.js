const request = require('request-promise');
const cheerio = require('cheerio');
// const fs = require('fs');
// const json2csv = require("json2csv").Parser;


exports.instagramfollower = async(req,res,next)=>{


  var conditions =req.params.username;

  if (conditions!=null) {

    var movie = `https://www.instagram.com/${conditions}/`;
 

    let imdbData = []
    const response =await request({
        uri:movie,
        headers:{
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip:true,
    });
 
    let $  = cheerio.load(response)
    let dataInString = $('script[type="application/ld+json"]').html();
  
    const object = JSON.parse(dataInString);
    
    // imdbData.push({
    //     title, rating, summary, releaseDate
    // });
 
    // const j2cp = new json2csv()
    // const csv = j2cp.parse(imdbData)
    // console.log(conditions)
    // console.log(movie)

    // console.log(dataInString)
    // console.log(conditions)

    

    res.send(object);


      
  } 

 
}

 

