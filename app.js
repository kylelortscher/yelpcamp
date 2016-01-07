//Needed For Express Framework
var express = require('express');

//For connect-flash NPM
var flash = require("connect-flash");

//Needed for express framework
var app = express();

//Needed for npm Body Parser
var bodyParser = require('body-parser');

//Used for MONGO DB
var mongoose = require("mongoose");

//Passport Used For Authentication
var passport = require("passport");

//Passport Local For Authentication
var LocalStrategy = require("passport-local");

//Needed for NPM method override
var methodOverride = require('method-override');

//User Model
var User = require("./models/user");

//Routes for comments on campgrounds
var commentRoutes = require("./routes/comment");

//Routes For Campground Listings 
var campgroundRoutes = require("./routes/campground");

//Routes in a seprate file for homepage and AUTH
var indexRoutes = require("./routes/index");

//Used to seed the database with data
var seedDB = require("./seeds");

//Running are function that we made in seeds.js
//seedDB();

//Using Flash from NPM connect-flash
app.use(flash());


//Passport Configuration
app.use(require("express-session")({
    secret: "Big Mama",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//FUNCTION TO CHECK EVERY SINGLE PAGE TO GET THE CURRENT USERS INFO
//WE ARE ALSO PASSING THE ERROR MESSAGES TO EVERY SINGLE PAGE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    res.locals.warning = req.flash("warning");
    next();
});


//Campground file model
var Campground = require("./models/campground");

// Comment file model
var Comment = require("./models/comment");

//Connection To A MongoDB Database Make Sure Mongod Is Running In Background
mongoose.connect("mongodb://localhost/yelp_camp");

//Boilerplate code needed for body-parser npm package
app.use(bodyParser.urlencoded({ extended: true }));

//Allows us to not use .ejs when using render on a file
app.set("view engine", "ejs");

//Getting Public Stylesheets And Javascript
app.use(express.static(__dirname + "/public"));

//Setup For MethodOverride NPM
app.use(methodOverride('_method'));


//SETTING UP ROUTES IN OTHER FILES
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);


//Boilerplate for Preview Application In Cloud9
app.listen(process.env.PORT, function(){
    console.log("https://yelpcamp-kylelortscher1.c9users.io/");
});