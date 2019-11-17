const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName : {
        type:String,
        required:"Required"
    },
    Email :{
        type: String,
        required:"Required"
    },
    Password : {
        type:String,
        required:"Required"
    }
});


module.exports = mongoose.models.User || mongoose.model('User',UserSchema);