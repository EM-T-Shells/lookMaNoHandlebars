const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session) {
    req.session.destroy(()=> {
      req.logout();
      res.redirect('/homepage');
    });
  } else {
    next();
  }
};

module.exports = withAuth;
