const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UserModel = require("../model/user.model");

const {redirectContact,redirectLogin} = require('../middlewares/auth_sess');

//register get route
router.get("/register", (req, res) => {
  return res.render("./users/registerUser");
});

//register post route
router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  const checkUser = await UserModel.findOne({ Email: email });

  if (userName && email && password) {
    if (checkUser === null) {
      const hashedPassword = await bcrypt.hash(password, 10);

      let user = new UserModel();
      user.UserName = userName;
      user.Email = email;
      user.Password = hashedPassword;

      user.save((err, docs) => {
        if (!err) {
          req.session.userId = docs._id;
          global.msg='user registered successfully';
          return res.redirect("/contacts");
        } else {
          return res.redirect("/register");
        }
      });
    }
    else {
        res.render('./users/registerUser',{message:'email already taken'});
    }
  }
});

//login get route

router.get("/login",redirectContact,(req,res)=>{
  return res.render("./users/login");
})

//login post  route

router.post("/login",redirectContact,async (req,res)=>{
  const {email, password } = req.body;

  const checkUser = await UserModel.findOne({ Email: email });
  if(!checkUser){
    return res.render('./users/login',{message:'no user with the email'});
  }else{
    let checkPasswordMatch = await bcrypt.compare(password,checkUser.Password);
    if(checkPasswordMatch){
      req.session.userId=checkUser._id;
      global.msg='user logged in successfully!!';
      return res.redirect("/contacts");
    }else{
      return res.render('./users/login',{message:'incorrect password'});
    }
  }
})

router.post('/logout',redirectLogin,(req,res)=>{
  req.session.destroy(err=>{
    if(err){
      return res.redirect('/contacts');
    }
    res.redirect('/');
  })
})

module.exports = router;
