const request = require('request-promise');
const cheerio = require('cheerio');
// const fs = require('fs');
// const json2csv = require("json2csv").Parser;


exports.instagramfollower = async(req,res,next)=>{


  var conditions =req.params.username;

  if (conditions!=null) {

    var movie = `https://www.instagram.com/${conditions}/?hl=en`;
 

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
    // let title = $('div[class="title_wrapper"]>h1').text().trim();
    // let rating = $('div[class="ratingValue"] > strong  >span').text();
    // let summary = $('div[class="summary_text"]').text().trim();
    // let releaseDate =  $('a[title="See more release dates"]').text().trim();
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

    

    res.send(dataInString);


      
  } 
  
    // fs.writeFileSync('./imdb.csv', csv, "utf-8")
 
}

 

