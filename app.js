//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "";
const aboutContent ="";
const contactContent = "";

const app = express();
const _ = require("lodash");
var posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home",{startingContent:homeStartingContent,posts:posts});
});
app.get("/about", function(req, res){
  res.render("about",{aboutContent:aboutContent});
});
app.get("/contact", function(req, res){
  res.render("contact",{contactContent:contactContent});
});
app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){

  for (let i=0; i<posts.length;i++){
    if (_.lowerCase(posts[i].title)===_.lowerCase(req.params.postName)){
      res.render("post",{post:posts[i]});
    }
  }

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
