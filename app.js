// jshine esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {StartingContent:
    homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {AboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {ContactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);

res.redirect("/");

});

app.get("/blogs/:postName", function(req, res){
  // console.log(req.params.postName);
  var requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    var storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      // console.log("Matched !!!");

      res.render("post", {
        title: post.title,
        content: post.content
      });

    }

    });
});

app.listen(1010, function() {
  console.log("Server started on port 1010");
});
