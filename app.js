const express = require('express');
const connection = require('./model/connectionDB');
connection();
const app = express();
const path = require("path");
const expressHandlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const session = require('express-session');
const UserModel = require("./model/user.model");

//controllers
const contactController = require("./controllers/contacts");
const userController = require("./controllers/users");

//custom middlewares
const {redirectLogin} = require('./middlewares/auth_sess');

//bodyParser middleware
app.use(bodyparser.urlencoded({
    extended:true
}));

//express-session middleware config
const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 3000,
  SESS_NAME = "sid",
  NODE_ENV = "development",
  SESS_SECRET = "dklasjdpoas",
  SESS_LIFETIME = TWO_HOURS
} = process.env;

const IN_PROD = NODE_ENV === "production";

app.use(
    session({
      name: SESS_NAME,
      resave: false,
      saveUninitialized: false,
      secret: SESS_SECRET,
      cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
      }
    })
  );


//setting up the view path
app.set('views',path.join(__dirname,"/views/"));

//setting up the view engine
app.engine("hbs",expressHandlebars({
    extname:"hbs",
    defaultLayout:"mainLayout",
    layoutsDir:__dirname+"/views/layouts"
}));

app.set("view engine","hbs");

//routes

app.use(async(req,res,next)=>{
    const {userId} = req.session;
    if(userId){
        const user = await UserModel.findOne({_id:userId})
        res.locals.user = user;
    }
    next();
})


app.use('/contacts',redirectLogin,contactController);

app.use('/user',userController);


app.get('/',(req,res)=>{
    res.render("index");
});





app.listen(3000,()=>{
    console.log('app listening at port 3000');
})