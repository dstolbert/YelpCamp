var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// INDEX ROUTE
router.get("/campgrounds", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});     
        }
    });
});

// NEW ROUTE

router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new"); 
});

// CREATE ROUTE
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
    Campground.create(req.body.campground, function(err, campground){
        if(err){
            console.log(err);
        } else {
                campground.author.id = req.user._id;
                campground.author.username = req.user.username;
                campground.save();
                res.redirect("/campgrounds");    
        }
    });
});

// SHOW ROUTE
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
            res.render("campgrounds/show", {campground: foundCampground});     
       }
    });
});
// EDIT CAMPGROUND
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        console.log(err);
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
// UPDATE CAMPGROUND
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});
// DESTROY CAMPGROUND
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
        res.redirect("/campgrounds");
        }
    });    
});

module.exports = router;