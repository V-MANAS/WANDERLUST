const user = require("../models/user"); 

module.exports.renderSignupForm = (req,res) =>{
  res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
      let {username,email,password} = req.body ;
      const NewUser = new user({email,username}); 
     const registerUser = await user.register(NewUser,password);
     req.login(registerUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","User was registered");
      res.redirect("/listings");
     });
  
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
  }; 

  module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
  };

  module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to wanderlust!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

  module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","you are logged out now");
      res.redirect("/listings");
    })
  };