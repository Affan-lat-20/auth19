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


// const request = require('request-promise');
// const cheerio = require('cheerio');
// const fs = require('fs');
// const json2csv = require("json2csv").Parser;
const getMetaData = require('metadata-scraper');




exports.instagramfollower = async(req,res,next)=>{

  let Dataarray = []
  var conditions =req.params.username;
 
if (conditions!=null) {

  const url = `https://www.instagram.com/${conditions}/`
  var data = await getMetaData(url)
  // Dataarray.push({data})
  // dataArray = data
  // console.log(data)
  //   const j2cp = new json2csv()
  // const csv = j2cp.parse(dataArray)
  //  fs.writeFileSync('./instadata.csv', csv, "utf-8")
  // console.log(Dataarray)

  
}
  res.send(data)

  
} 
  



