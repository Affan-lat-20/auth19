const request = require('request-promise');
const cheerio = require('cheerio');
const axios = require('axios');
const { response } = require('express');
const req = require('request');
const requestPromise = require('request-promise');



async function getData(conditions) {
	return new Promise(async (resolve, reject)=> {
		var movie = `https://www.instagram.com/${conditions}/?hl=en`;
		console.log('URL',movie);
		const response = await request({
			uri:movie,
			headers:{
				"accept": "*/*",
				"accept-encoding": "gzip, deflate, br",
				"accept-language": "en-US,en;q=0.9"
			},
			gzip:true,
		});
		//console.log('~~~response~~~: ', response);
		let $ = await cheerio.load(response);
		//console.log('~~~ $~~~: ', $);
		let dataInString = $('script[type="application/ld+json"]').html();
		//console.log('~~~dataInString~~~: ',dataInString);

		const object = await JSON.parse(dataInString);
		console.log('~~~object~~~: ',object);

		if(object == null || object == undefined){
			return reject(false)
		}
		else {
			console.log('else: ', object);
			return resolve(object);
		}
	})
}
var temp = 0;
function getDatahelper(conditions, res) {
	
	return new Promise((resolve)=> {
		getData(conditions).then(
			response=> {
				resolve(response)
			},
			err=> {
				console.log(`Strike ${temp}`);
				if ( temp == 3 )
				{
					temp = 0;
					// res.send({"err":500, "error": "General Processing Error"})
					return;
				}
				++temp;

				getDatahelper(conditions)
			}
		)
	})
	
}

exports.instagramfollower = async(req,res,next)=>{

	var conditions =req.params.username;
	// getDatahelper(conditions).then(
	// 	(data)=> {
	// 		console.log('data:', data);
	// 		res.send(data);
	// 	},
	// 	(error)=> {
	// 		console.log(error)
	// 		res.send({error: 'Main module error'})
	// 	}
	// );
	const getData = await getDatahelper(conditions, res);
	res.send(getData);
}