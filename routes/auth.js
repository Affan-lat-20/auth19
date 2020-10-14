const router = require('express').Router();
const User = require('../model/User');
const BrandEmployee = require('../model/BrandEmployee');
const CompanyProduct = require("../model/Companyproducts");
const Influencer = require("../model/Influencer");

const { Router } = require('express');
const AuthController = require("../controllers/AuthController");
const BrandEmployeeController=require("../controllers/BrandEmployeeController");
const CompanyProductsController=require("../controllers/CompanyProductController");
const InfluencerController=require("../controllers/InfluencerController");

//const registerValidation = require('../validation');

//***********************************Company routes start**********************/    
//register new user
router.post('/register',AuthController.register);

//login
router.post('/login',AuthController.login);

//delete user from db//
router.delete('/delete/:id',AuthController.delete);


//update user info//

router.put('/edit/:id',AuthController.edit);

//get one userinfo//
router.get('/userGet/:id',AuthController.userGet);
//get all users data//
router.get('/userlist',AuthController.allusersGet);

//**************************************Company user ends here**************************************//


//***************************************Brand Employee Routes**************************************//

// create brandemployee//
router.post('/:id/brandemployee',BrandEmployeeController.registerEmployee);

//delete brandemployee
router.delete('/:id/employeeDelete',BrandEmployeeController.employeeDelete);


//get single brandemployee

router.get('/:id/employeeGet',BrandEmployeeController.employeeGet);

router.get('/:id/employeeGet',BrandEmployeeController.employeeGet);
//edit brandemployee

router.put('/:id/employeeEdit',BrandEmployeeController.employeeEdit)
//get all brandemployee that are in db//
router.get('/employeelist',BrandEmployeeController.allemployeeGet);
//get all brandemployee for specific company//
router.get('/:id/employeelist',BrandEmployeeController.allemployeeCompanyGet);

//**********************************End of brand employees****************************/


//*********************************CompanyProductRoutes*******************************/
//add company products//
router.post('/:id/addproduct',CompanyProductsController.addproduct);
//delete product
router.delete('/:id/productdelete',CompanyProductsController.productdelete);
//single product selected
router.get('/:id/productget',CompanyProductsController.productget);
//get all product selected in databse//
router.get('/:id/allproductGet',CompanyProductsController.allproductGet);
//get all product for specific company selected//
router.get('/:id/allproductCompanyGet',CompanyProductsController.allproductCompanyGet);
//update product//
router.put('/:id/updateproduct',CompanyProductsController.updateproduct);


//------------------------------------------------------------------
//Influencer
//influencer login 
router.post('/influencerLogin',InfluencerController.influencerLogin);
//register new influencer
router.post('/influencerRegister',InfluencerController.influencerRegister);

//delete influencer from db
router.delete('/influencerDelete/:id',InfluencerController.influencerDelete);

// //update influencer info//

router.put('/influencerEdit/:id',InfluencerController.influencerEdit);

// //get one influencerinfo//
router.get('/:id/influencerGet',InfluencerController.influencerGet);
// //get all influencer data//
router.get('/influencerallGet',InfluencerController.influencerallGet);

module.exports = router;