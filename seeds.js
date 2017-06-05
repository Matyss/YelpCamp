var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
    {
        name: "Cloud's Rest",
        image: 'https://farm3.staticflickr.com/2651/3776039854_6ca63217cd.jpg',
        description: 'Kielbasa t-bone short ribs ham tenderloin brisket chicken sausage frankfurter corned beef shank leberkas. Ground round corned beef bresaola, tri-tip picanha fatback tail shank venison meatball ham hock pork jowl. Alcatra capicola ribeye andouille ground round fatback, bacon brisket beef ribs pig t-bone porchetta shank. Meatball leberkas ham alcatra pork belly turducken meatloaf chicken ribeye bacon tongue strip steak porchetta beef ribs cow. Short loin pork porchetta pork chop kielbasa chuck corned beef capicola ham hock burgdoggen filet mignon chicken andouille cupim pig.'
    },
    {
        name: "Mountain Camp",
        image: 'https://farm8.staticflickr.com/7161/6498260841_dc8e89d348.jpg',
        description: 'Kielbasa t-bone short ribs ham tenderloin brisket chicken sausage frankfurter corned beef shank leberkas. Ground round corned beef bresaola, tri-tip picanha fatback tail shank venison meatball ham hock pork jowl. Alcatra capicola ribeye andouille ground round fatback, bacon brisket beef ribs pig t-bone porchetta shank. Meatball leberkas ham alcatra pork belly turducken meatloaf chicken ribeye bacon tongue strip steak porchetta beef ribs cow. Short loin pork porchetta pork chop kielbasa chuck corned beef capicola ham hock burgdoggen filet mignon chicken andouille cupim pig.'
    },
    {
        name: "Oasis Campsite",
        image: 'https://farm8.staticflickr.com/7148/6622139405_9753433ff9.jpg',
        description: 'Kielbasa t-bone short ribs ham tenderloin brisket chicken sausage frankfurter corned beef shank leberkas. Ground round corned beef bresaola, tri-tip picanha fatback tail shank venison meatball ham hock pork jowl. Alcatra capicola ribeye andouille ground round fatback, bacon brisket beef ribs pig t-bone porchetta shank. Meatball leberkas ham alcatra pork belly turducken meatloaf chicken ribeye bacon tongue strip steak porchetta beef ribs cow. Short loin pork porchetta pork chop kielbasa chuck corned beef capicola ham hock burgdoggen filet mignon chicken andouille cupim pig.'
    }
];
    
function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log('Removed campgrounds!');
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log('Added a campground');
                    //create a comment
                    Comment.create(
                        {
                            text: 'This place is great, but I wish there was internet',
                            author: 'Homer'
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('created new comment');
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;