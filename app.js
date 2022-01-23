//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');

const app = express();

var posts = [];
var titles = [];
var posts_tr = [];
var length = 100;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/compose',function(req,res){
  res.render('compose')
})

app.get('/',function(req,res){
  res.render('home',{posts:posts_tr , titles : titles})
})

app.get('/post/:topic',function(req,res){

  for(var i =0;i<posts.length;i++)
  {
    if(req.params.topic === lodash.kebabCase(posts[i].title))
    {
      res.render('post',{ post:posts[i]})
    }
  }
})


app.post('/compose',function(req,res){
  const post = {
    title : req.body.title,
    blog : req.body.blog
  }
  const post_tr ={
    title : req.body.title,
    blog : req.body.blog.substring(0,length)
  }
  posts.push(post)
  posts_tr.push(post_tr)
  titles.push(lodash.kebabCase(post.title));
  res.redirect('/')
})











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
