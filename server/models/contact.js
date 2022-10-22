let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    name:String,
    phone_number:String,
    email:String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel) 