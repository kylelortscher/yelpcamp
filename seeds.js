var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "h",
        description: "Blah blah blah"
    },
    {
        name: "Yosemite",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Camping_by_Barriere_Lake,_British_Columbia_-_20040801.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Pine Peak",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Camping_by_Barriere_Lake,_British_Columbia_-_20040801.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Mt. Crater",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Camping_by_Barriere_Lake,_British_Columbia_-_20040801.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Mt. Dana",
        image: "http://www.lifeofpix.com/wp-content/uploads/2015/12/Life-of-Pix-free-stock-photos-paint-tag-colours-privateclinic.jpg",
        description: "Blah blah blah"
    },
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
    //   if(err) {
    //       console.log(err);
    //   } 
    //   console.log("removed campgrounds!");
    //   //Add a few campgrounds
    //     data.forEach(function(seed){
    //       Campground.create(seed, function(err, campground){
    //           if(err){
    //               console.log(err)
    //           } else {
    //               console.log("added a campground");
    //               //Create a comment on each campground
    //               Comment.create(
    //                   {
    //                       text: "This place was great I wish there was internet",
    //                       author: "Homeer"
    //                   }, function(err, comment){
    //                       if(err) {
    //                           console.log(err);
    //                       } else {
    //                           campground.comments.push(comment);
    //                           campground.save();
    //                           console.log("Created new comment");
    //                       }
    //                 });
    //           }
    //       }); 
    //     });
    });
    //Add a few comments
    
}

module.exports = seedDB;