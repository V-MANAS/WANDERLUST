const express = require ("express");
const app= express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const  session = require("express-session");
const flash =require("connect-flash");
const { name } = require("ejs");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = (
  {
    secret:"mysupsecretstring",
    resave: false,  
    saveUninitialized: true 
  });

  app.use(session(sessionOptions ));
  app.use(flash());

  app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  })



  app.get("/register",(req,res)=>{
    let {name="Anonymous"}=req.query;
    req.session.name = name;
   
    if(name === "Anonymous"){
      req.flash("error","user not registered !");
    }else{
      req.flash("success","user registered successfully!");
    }

    res.redirect("/hello");
  });

  app.get("/hello",(req,res)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.render("page.ejs",{name:req.session.name});
  });

// app.get("/reqcount",(req,res)=>{
//   if(req.session.count){
//     req.session.count++;
//   }else{
//     req.session.count = 1;
//   }

//   res.send(`You sent a request ${req.session.count} times`);
// });

app.get("/test",(req,res)=>{
  res.send("Test successfully!!");
})

app.listen(3000,()=>{
  console.log("server is listening to 3000");
});