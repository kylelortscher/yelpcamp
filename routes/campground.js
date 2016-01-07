var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");



//======================================
//CAMPGROUNDS RESTFUL ROUTES
//======================================

//======================================
//CAMPGROUNDS INDEX
//======================================
router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
       if(err) {
           console.log("error :(");
       } else {
           res.render("campgrounds/index", {campgrounds:campgrounds});
       }
    });
});

//======================================
//CAMPGROUNDS POST
//======================================
router.post("/campgrounds",middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var newCampground = {name:name, image:image, description:description, author:author};
  //Create a new campground and save to database
  Campground.create(newCampground, function(err, newCreate){
     //Checking for errors if theres is an error go back to new page else go to campgrounds
     if(err) {
         res.redirect("/new");
     } else {
         res.redirect("/campgrounds");
     }
  });
});

//======================================
//CAMPGROUNDS NEW
//======================================
router.get("/campgrounds/new",middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//======================================
//CAMPGROUNDS SHOW
//======================================
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log("Error :(");
       } else {
           res.render("campgrounds/show", {campground: foundCampground}); 
       }
    });
});


//======================================
//CAMPGROUNDS EDIT
//======================================
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
           res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});


//======================================
//CAMPGROUNDS UPDATE
//======================================
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
     if(err) {
         res.redirect("/campgrounds");
     } else {
         res.redirect("/campgrounds/" + req.params.id);
     }
   });
});

//======================================
//CAMPGROUNDS DESTROY
//======================================
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;