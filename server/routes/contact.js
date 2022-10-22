let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//let jwt = require('jsonwebtoken');

let passport = require('passport');

let contactController = require('../controllers/contact');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// //connect to our Contact model
 let Contact = require('../models/contact');
 //let contactController = require('../controllers/contact');

/* Get route for Contact list - READ Operation */
router.get('/',contactController.displayContactList);

//get route for displaying add page -create operation
router.get('/add',requireAuth,contactController.displayAddPage);

//post route for processing the add page -create operation
router.post('/add',requireAuth,contactController.processAddPage);

//get route for displaying edit page -update operation
router.get('/edit/:id',requireAuth,contactController.displayEditPage);

//post route for processing the edit page -update operation
router.post('/edit/:id',requireAuth,contactController.processEditPage);

//get route for displaying delete page -delete operation
router.get('/delete/:id',requireAuth,contactController.performDelete);

module.exports = router;