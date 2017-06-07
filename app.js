var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    methodOverride  = require("method-override");
    

//REQUIRING ROUTES
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    authRoutes          = require('./routes/auth');

mongoose.Promise = global.Promise;

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//require moment
app.locals.moment = require('moment');
//seedDB(); //seed the database 

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'Some secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!!!");
});

