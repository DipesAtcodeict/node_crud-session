const express = require("express");

const router = express.Router();
const ContactModel = require("../model/contact.model");

router.get("/", (req, res) => {
  ContactModel.find((err, docs) => {
    if (err) {
      console.log("there is error accessing the data...");
    } else {
      res.render("contactList", { data: docs, message: global.msg,userName:res.locals.user.UserName });
      global.msg = "";
    }
  });
});

router.get("/add", (req, res) => {
  res.render("addContact");
});

router.post("/add", (req, res) => {
  let contact = new ContactModel();
  contact.Name = req.body.contactName;
  contact.Email = req.body.contactEmail;
  contact.Phone = req.body.contactPhone;

  contact.save((err, docs) => {
    if (!err) {
      global.msg = "contact created successfully";
      res.redirect("/contacts");
    } else {
      res.send("error occurred");
    }
  });
});

router.get("/edit-contact/:name", (req, res, next) => {
  let name = req.params.name;

  ContactModel.findOne({ Name: name }, (err, docs) => {
    res.render("updateContact", { data: docs });
  });
});

router.post("/edit-contact:name", async (req, res,next) => {
  let name = req.params.name;

  let doc = await ContactModel.findOneAndUpdate({Name:name},{
    Name: req.body.contactName,
    Email:req.body.contactEmail,
    Phone:req.body.contactPhone
  });

  global.msg="contact updated successfully";
  return res.redirect('/contacts');
});

router.post("/delete", (req, res) => {
  let name = req.body.name;

  ContactModel.deleteOne({Name:name},(err)=>{
      if(!err){
          global.msg="contact deleted successfully";
          return res.redirect('/contacts');
      }
  })
});

module.exports = router;
