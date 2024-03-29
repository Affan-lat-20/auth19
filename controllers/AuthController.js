const User = require('../model/User');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Joi = require('@hapi/joi');
// const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');


exports.register = async(req,res,next)=>
{
    

    //Validate USER DATA Before SUBMIT
   
    // const schema = Joi.object({ 
    //     firstName: Joi.string().min(4).max(20).required(),
    //     lastName: Joi.string().min(4).max(20).required(),
    //     contactNo: Joi.string().min(4).max(50).required(),
    //     signature: Joi.string().min(4).max(50).required(),
    //     econcent: Joi.boolean(),
    //     corporateHierarchy: Joi.string().min(4).max(50).required(),
    //     address: Joi.string().min(4).max(100).required(),
    //     country: Joi.string().min(4).required(),        
    //     companyName: Joi.string().min(4).required(),
    //     websiteUrl: Joi.string().min(4).required(),
    //     email: Joi.string().min(8).required(),
    //     password: Joi.string().min(8).required()
    // });
    
    // const {error} = schema.validate(req.body);
    
    // if (error) return res.status(400).send(error.details[0].message);

    //Check if email already on Database

    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //User password hashing

    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password, salt);
    
   //Create new user

   const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    signature:req.body.signature,
    econcent:req.body.econcent,
    corporateHierarchy:req.body.corporateHierarchy,
    address:req.body.address,
    contactNo:req.body.contactNo,
    country: req.body.country,
    companyName: req.body.companyName,
    websiteUrl: req.body.websiteUrl,
    email: req.body.email,    
    password:hashedPassword
});
    try {
        const savedUser = await user.save();
        // console.log(savedUser);

        res.send(savedUser);
        next();
        
    } catch (error) {
        res.status(400).send(error);
    }

   
}

exports.login = async(req,res,next) =>
{
    //User Validation before login
    
    const schema = Joi.object({ 
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    
    const {error} = schema.validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);
    
     //Check if email is on Database
    
     const user = await User.findOne({email:req.body.email});
     if(!user) return res.status(400).send('There is no Account with this Email');
     
     //Password Validation
     const validPass = await bcrypt.compare(req.body.password, user.password);
     if(!validPass) return res.status(400).send('Invalid password');
    res.send(user);
     //Create and assign jwt tokken
     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
     res.header('auth-token',token).send(token);
    
     res.send('User logged in');
     next();
    
}    

exports.delete =  async(req,res,next)=>{

    User.findOne({_id: req.params.id}, function (error, user){
        console.log("This object will get deleted " + user);
        
        user.remove();
        res.send("This user is removed "+ user.firstName);
        next()
    });
    
}

exports.edit =  function (req,res,next){
    var conditions ={_id: req.params.id};
    if(req.body != {email:req.body.email} || req.body != req.body.password){
        User.updateOne(conditions, req.body)   
        .then(doc =>{
            if(!doc){
                return res.status(404).end();}
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
        
    }
    else{
        res.send("cant update email or password");

    }
   
    }


    exports.userGet=async(req,res,next)=>{
        User.findOne({_id: req.params.id},function(error, user){
            console.log("This user will get selected "+ user);

            res.send("This user is selected"+ user);
            next();
        });
    }

    exports.allusersGet=async(req , res,next)=> {
        User.find({}).then(function (users) {
        res.send(users);
        next();
        });
       }

       exports.gmailer=async(req , res,next)=> {  
        // let c= null;
        // if(req.body.cc!=null){

        //     let c=req.body.cc.toString()
        // }
        //validations//

        //Validate USER DATA Before SUBMIT
   
        const schema = Joi.object({ 
            from: Joi.required(),
            to:Joi.required().toString(),
            cc:Joi.optional().toString(),
            subject:Joi.required(),
            text:Joi.required()
        });
        
        const {error} = schema.validate(req.body);
        
        if (error) return res.status(400).send(error.details[0].message);
        /////
       
                 

        let transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.affan.dev55@gmail.com",
            service: 'gmail',
            // port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'youremail@gmail.com', // generated ethereal user
              pass: 'yourpass', // generated ethereal password
            },

            tls:{
                rejectUnauthorized:false
              }
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: req.body.from||'"Testing email server" <a@pod.com>', // sender address
            to: req.body.toemail.toString(), // list of receivers
            cc:req.body.cc == undefined ? '' : req.body.cc.toString(),//list of cc
            subject: req.body.subject, // Subject line
            text: req.body.details||"Hello world?", // plain text body
            // html: req.body.details, // html body
            
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          res.send('success')
        }

        
        exports.mailer=async(req , res,next)=> {


                
   
        
       
          
            try{
                 //Validate USER DATA Before SUBMIT
                const schema = Joi.object({ 
                    // from: Joi.required(),
                    to:Joi.required(),
                    cc:Joi.optional(),
                    subject:Joi.required(),
                    details:Joi.required()
                });
                
                const {error} = schema.validate(req.body);
                
                if (error) return res.status(400).send(error.details[0].message);
                /////
            let transporter = nodemailer.createTransport({
                        
                //  protocol:'smtp', // 'mail', 'sendmail', or 'smtp'
                host :'mail.lathransoft.com',
                port : 587,
                secure: false,
                auth: {
                    user: 'support@lathransoft.com', // generated ethereal user
                    pass: '!@#Developer123', // generated ethereal password
              },
  
                 tls:{
                     rejectUnauthorized:false
                },            
                // mtp_crypto :'ssl',
                // mailtype :'html',
                // smtp_timeout :'60', //in seconds
                // charset :'utf-8',
                // wordwrap : TRUE,      
                 });
         
              // send mail with defined transport object
              let info = await transporter.sendMail({
                from: '"Testing email server" <support@lathransoft.com>', // sender address
                to: req.body.to.toString(), // list of receivers
                cc:req.body.cc == undefined ? '' : req.body.cc.toString(),//list of cc
                subject: req.body.subject, // Subject line
                text: req.body.details, // plain text body
                // html: req.body.details, // html body
                
              });
            
              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              res.send('success')

            }

            catch(error) {
                console.error(error);
                res.send('Message sending failed')
            }

        }
      
       

    