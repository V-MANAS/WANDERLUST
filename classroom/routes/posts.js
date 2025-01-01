const express = require("express");
const router = express.Router();

//posts
//Index
router.get("/",(req,res)=>{
  res.send("Get for Post ..");
});

//show 
router.get("/:id",(req,res)=>{
  res.send("GET for POST ID.");
});

//Post 
router.post("/",(req,res)=>{
  res.send("Post for POST..");
});

//Delete 
router.delete("/:id",(req,res)=>{
  res.send("Delete for users..");
});

module.exports = router;
