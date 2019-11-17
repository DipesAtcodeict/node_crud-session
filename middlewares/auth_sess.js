exports.redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("user/login");
  } else {
    next();
  }
};

exports.redirectContact = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/contacts");
  } else {
    next();
  }
};
