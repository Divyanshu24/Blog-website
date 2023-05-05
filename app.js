const express= require('express');
const bodyParser= require('body-parser');
const ejs = require('ejs');
const mongoose= require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogsDB",{useNewUrlParser:true});
const blogSchema= new mongoose.Schema({
    title: String, 
    content: String,
    date: String
});
const blog= mongoose.model('blog', blogSchema);

const app= express();
const homestarting= "Welcome to Blog";
const aboutstart= "This website is for writing blog and convey your story to every one.";
app.set('view engine', 'ejs');
const contactstart= "ruiheirhiu heruigh uirghuergh brgu giurgh bhdfvhjergubg rgur gug urghre guger gehbe grugyrgburhb urg gehghuruegh erugerygeurhbrybruyg uer gureg uyr ere hfbvuyrgfbvhrgrg sghgfdhuergblsfdalgfhgf  rhg fer er greu rg rueg re grughfburh urgfuerf rgyrfb b regur gfrg ruergf iurfhdbshfb r gfr gfh guer g bfh gr eru gh u gre r hg";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const date= new Date();
var day= date.toLocaleDateString();
app.get("/",function(req,res){
    
    blog.find().then((foundblog)=>{
        res.render("home", {startingpara:homestarting, bloglist:foundblog});
    }).catch((err)=>{
        console.log(err);
    })
   
    
});
app.get("/about",function(req,res){
   res.render("about", {aboutpara:aboutstart });
});
app.get("/contact",function(req,res){
    res.render("contact", {contactpara:contactstart });
});
app.get("/compose",function(req,res){
    res.render("compose");
});

 
app.post("/compose", function(req,res){
    const post= new blog ({
        title:req.body.title,
        content: req.body.postarea,
        date: day
    });
    blog.create(post).then(function () {
        console.log("post added sucessfully");
    }).catch(function (err) {
        console.log(err);
    });
    // post.save();
    // mongoose.connection.close();
    res.redirect("/");
});




app.listen(3000, function(){
   console.log("server started");
});