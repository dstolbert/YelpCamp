var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
        {   
            name: "Cloud Peak",
            image: "https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg",
            description: "Four loko cliche hella before they sold out gastropub deep v. Health goth banjo knausgaard, marfa hot chicken polaroid craft beer distillery celiac kombucha poutine la croix put a bird on it. Artisan cold-pressed raw denim etsy DIY ennui letterpress twee wayfarers la croix fixie crucifix. Lomo umami jean shorts kinfolk taiyaki kickstarter. Tumblr before they sold out hexagon flexitarian tofu YOLO lo-fi edison bulb truffaut occupy listicle farm-to-table church-key intelligentsia palo santo. Lyft ennui meggings kitsch hell of paleo deep v, leggings aesthetic migas craft beer. Microdosing tilde woke beard semiotics, shoreditch vegan XOXO meggings franzen disrupt air plant VHS shabby chic live-edge."
        },
        {
            name: "Badlands",
            image: "https://farm6.staticflickr.com/5042/5235343632_ceb706da07.jpg",
            description: "Four loko cliche hella before they sold out gastropub deep v. Health goth banjo knausgaard, marfa hot chicken polaroid craft beer distillery celiac kombucha poutine la croix put a bird on it. Artisan cold-pressed raw denim etsy DIY ennui letterpress twee wayfarers la croix fixie crucifix. Lomo umami jean shorts kinfolk taiyaki kickstarter. Tumblr before they sold out hexagon flexitarian tofu YOLO lo-fi edison bulb truffaut occupy listicle farm-to-table church-key intelligentsia palo santo. Lyft ennui meggings kitsch hell of paleo deep v, leggings aesthetic migas craft beer. Microdosing tilde woke beard semiotics, shoreditch vegan XOXO meggings franzen disrupt air plant VHS shabby chic live-edge."
        },
        {
            name: "Blue Mounds",
            image: "https://farm9.staticflickr.com/8225/8501722128_0b8ddb3330.jpg",
            description: "Four loko cliche hella before they sold out gastropub deep v. Health goth banjo knausgaard, marfa hot chicken polaroid craft beer distillery celiac kombucha poutine la croix put a bird on it. Artisan cold-pressed raw denim etsy DIY ennui letterpress twee wayfarers la croix fixie crucifix. Lomo umami jean shorts kinfolk taiyaki kickstarter. Tumblr before they sold out hexagon flexitarian tofu YOLO lo-fi edison bulb truffaut occupy listicle farm-to-table church-key intelligentsia palo santo. Lyft ennui meggings kitsch hell of paleo deep v, leggings aesthetic migas craft beer. Microdosing tilde woke beard semiotics, shoreditch vegan XOXO meggings franzen disrupt air plant VHS shabby chic live-edge."
        }
    ];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Removed Campgrounds");  
            
            //Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err,campground){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("added a campground");
                        Comment.create({
                          text: "This place is great!",
                          author: "Catie"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);    
                                campground.save();
                                console.log("Comment added")
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;