// server.js

// init project
var express = require('express');
//var mongo = require("mongodb").MongoClient;
var datab = require("./database.js");
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
//mongodb://<dbuser>:<dbpassword>@ds157964.mlab.com:57964/jonbase

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/new/*", function (request, response) {
  
  var requestedURL = request.path.slice(5, request.path.length);
  
  
  var found = datab.serch(requestedURL);
  function showNewIndex (num){
    response.send("the index for the new page is " + num + ".");
  }
  
   if (found) {
     console.log(found);
     response.send(JSON.stringify("found" + found));
     
  } else {
    var redirect = datab.newRedirect(requestedURL, showNewIndex);
    console.log("adding...");
    //response.send(redirect);
  }
  
});

app.get("/*", function (request, response) {
  if (request.path == "/") {
    response.send("1: Write a URL in the URL. Like so: \nhttps://smal-url.glitch.me/new/https://www.reddit.com");
  } else{
    
    function calbak(url){
      if (url) {
        response.redirect(url);
      } else {
        response.send("No such index, try creating one!");
      }

    };
    console.log(request.path);
    console.log(request.path.slice(1,request.path.length));
    datab.findRedirect(parseInt(request.path.slice(1,request.path.length)), calbak);
  }
});

app.get("*" , function(request,response){
  response.send("2: Write a URL in the URL. Like so: \nhttps://smal-url.glitch.me/new/https://www.reddit.com");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
