module.exports = function(req, res, next) {
  if (req.session.user || req.user) {
    // console.log('isAuth ' + req.session.user.name );
    next();
  } else {
    res.json("NOT AUTH");
  }
};
