const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    Name : {
        type:String,
        required:"Required"
    },
    Email :{
        type: String,
        required:"Required"
    },
    Phone : {
        type:String,
        required:"Required"
    }
});

const ContactModel = mongoose.model("Contacts",ContactSchema);

module.exports = ContactModel;