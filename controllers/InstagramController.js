// const axios= require('axios');
// const cheerio= require('cheerio');
 
// exports.getHTML=(url)=>{
//     const { data: html } = axios.get(url);
//     return html;
// }
//   exports.getInstagramFollowers=(html)=> {
//     // load up Cheerio

//     const $ = cheerio.load('https://www.instagram.com/aieseckarachi');
//     const dataInString = $('script[type="application/ld+json"]').html();
//     console.log(dataInString)
//     const pageObject = JSON.parse(dataInString);
//     return (
//       // pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
//       pageObject
//     );
//   }
 
//   exports.getInstagramCount=()=> {
//     const html = this.getHTML('https://www.instagram.com/aieseckarachi');
//     const instagramCount =this.getInstagramFollowers(html);
//     console.log(instagramCount)

//     return instagramCount;
//   }
 
//   exports.intagramfollower = async(req,res,next)=>{
//     console.log(`Scraping!!`);
//     // const icount =Promise.all([
//     // //   getInstagramCount(),
//     //   this.getInstagramCount()
//     // //   getTwitterCount()
//     // ]);
//     const icount = this.getInstagramCount()
//     // 
//     // res.json({ iCount, tCount });
//     console.log(icount);
//     res.json(icount);

//   }


const request = require('request-promise');
const cheerio = require('cheerio');
// const fs = require('fs');
// const json2csv = require("json2csv").Parser;


exports.instagramfollower = async(req,res,next)=>{


  var conditions =req.params.username;
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
    console.log(object)

    res.send(object);
    // fs.writeFileSync('./imdb.csv', csv, "utf-8")
 
}

 

