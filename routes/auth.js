const router = require('express').Router();
const User = require('../model/User');
const BrandEmployee = require('../model/BrandEmployee');
const CompanyProduct = require("../model/Companyproducts")


const { Router } = require('express');
const AuthController = require("../controllers/AuthController");
const BrandEmployeeController=require("../controllers/BrandEmployeeController");
const CompanyProductsController=require("../controllers/CompanyProductController")
//const registerValidation = require('../validation');

    
//register new user
router.post('/register',AuthController.register);

//login
router.post('/login',AuthController.login);

//delete user from db
router.delete('/delete/:id',AuthController.delete);


//update user info//

router.put('/edit/:id',AuthController.edit);

//get one userinfo//
router.get('/userGet/:id',AuthController.userGet);
//get all users data//
router.get('/userlist',AuthController.allusersGet);


//Brand Employee Routes

// create brandemployee
router.post('/:id/brandemployee',BrandEmployeeController.registerEmployee);

//delete brandemployee
router.delete('/:id/employeeDelete',BrandEmployeeController.employeeDelete);

//get single brandemployee
router.get('/:id/employeeGet',BrandEmployeeController.employeeGet);
//edit brandemployee
router.put('/:id/employeeEdit',BrandEmployeeController.employeeEdit)
//get all brandemployee//
router.get('/employeelist',BrandEmployeeController.allemployeeGet);
//get all brandemployee for specific company//
router.get('/:id/employeelist',BrandEmployeeController.allemployeeCompanyGet);


//CompanyProductRoutes
//add company products//
router.post('/:id/addproduct',CompanyProductsController.addproduct);
//delete product
router.delete('/:id/productdelete',CompanyProductsController.productdelete);
//single product selected
router.get('/:id/productget',CompanyProductsController.productget);
//all product selected
router.get('/:id/allproductGet',CompanyProductsController.allproductGet);
//all product for specific company selected
router.get('/:id/allproductCompanyGet',CompanyProductsController.allproductCompanyGet);
//update product
router.put('/:id/updateproduct',CompanyProductsController.updateproduct);







module.exports = router;