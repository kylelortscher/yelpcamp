var Campground = require("../models/campground");
var Comment = require("../models/comment");
//===============================
//ALL MIDDLEWARE STORRED HERE
//===============================



//EMPTY OBJECT TO PUT FUNCTION
var middlewareObj = {};


//=============================
//CHECK IF USER IS LOGGED IN
//=============================
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Log In First!");
    res.redirect("/login");
}


//======================================
//CHECK IF CURRENT USER OWNS CAMPGROUND
//======================================
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    //Is User Logged In? You can use if(req.isAuthenticated()
    if(req.isAuthenticated()){
        //Does The User Own The Campground?
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               res.redirect("back");
           } else {
               //IMPORTANT THIS IS THE PROPER WAY TO CHECK IF THEY ARE EQUAL foundCampground.author.id === req.user._id WILL NOT WORK
               //foundCampground.author.id is an object and req.user._id is a string
               if(foundCampground.author.id.equals(req.user._id)){
                    next(); 
               } else {
                   res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }    
}


//======================================
//CHECK IF CURRENT USER OWNS COMMENT
//======================================
middlewareObj.checkCommentOwnership = function (req, res, next) {
    //Is User Logged In? You can use if(req.isAuthenticated()
    if(req.isAuthenticated()){
        //Does The User Own The Comment?
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           } else {
               if(foundComment.author.id.equals(req.user._id)){
                    next(); 
               } else {
                   res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }    
}

module.exports = middlewareObj;