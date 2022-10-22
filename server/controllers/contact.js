let express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let Contact = require('../models/contact');

let jwt = require('jsonwebtoken');

//exporting controller methods
module.exports.displayContactList = (req,res,next)=>{
    Contact.find((err, ContactList) => {
        if (err) {
            return console.error(err);
        }
        else{
            //console.log(ContactList);
            res.render('contact/list', 
            {title: 'Contact List', 
            ContactList: ContactList,
            displayName: req.user ? req.user.displayName : ''}); 
        }
    });
}

module.exports.displayAddPage = (req,res,next)=>{
    res.render('contact/add', {title: 'Add Contact',displayName: req.user ? req.user.displayName : '' })
}

module.exports.processAddPage = (req,res,next)=>{
    let newContact = Contact({
        "name": req.body.name,
        "phone_number": req.body.phone_number,
        "email": req.body.email
    });
    Contact.create(newContact,(err,Contact) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else{
            res.redirect('/contact-list');
        }
    });
}

module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;
    Contact.findById(id,(err,contactToEdit)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.render('contact/edit',{title:'Edit Contact', Contact:contactToEdit,displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id
    console.log(req.body);
    let updatedContact = Contact({
        "_id":id,
        "name": req.body.name,
        "phone_number": req.body.phone_number,
        "email": req.body.email
    });
    Contact.updateOne({_id:id},updatedContact,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next)=>{
    let id = req.params.id;
    Contact.remove({_id:id},(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contact-list');
        }
    });
}