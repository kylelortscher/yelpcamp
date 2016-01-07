var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");


//======================================
//COMMENTS ROUTES
//======================================



//======================================
//NEW COMMENT FORM
//======================================
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res) {
    //Find campground by id
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});


//======================================
//NEW COMMENT POST
//======================================
router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res){
   // Step 1 Lookup Campground ID
   // Step 2 Create A New Comment
   // Step 3 Connect nex comment to campground
   // Step 4 Redirect to Campground Show Page
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          //Because of text[body] in html we don't have to have var text = req.body.text;
          Comment.create(req.body.comment, function(err, comment){
              if(err) {
                  console.log(err);
              } else {
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect('/campgrounds/' + campground._id);
              }
          });
      }
   });
});


//======================================
//EDIT COMMENT
//======================================
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } else {
           res.render("comments/edit", {campgroundId: req.params.id, comment: foundComment});
       }
    });
});

//======================================
//UPDATE COMMENT
//======================================
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});


//======================================
//DELETE COMMENT
//======================================
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


module.exports = router;