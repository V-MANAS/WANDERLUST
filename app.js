const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=  require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const session = require("express-session")

const listings = require("./routes/listings.js");
const review = require("./routes/review.js");

// const ExpressError =require("../../utils/ExpressError.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",review);



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Paeg not found!"));

});

app.use((err,req,res,next)=>{
  let {status=500, message="something went wrong!" } = err;
  res.status(status).render("error.ejs",{message});
  // res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
