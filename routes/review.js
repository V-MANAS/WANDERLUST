const express = require ("express");
const router = express.Router({mergeParams: true}); 
const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing.js");
// const Review = require("../models/review.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controller/review.js");


//reviews
//post review route
router.post("/", validateReview,isLoggedIn ,wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewsId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;
