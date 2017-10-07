// server.js

// init project
var express = require('express');
//var mongo = require("mongodb").MongoClient;
var datab = require("./database.js");
var app = express();

var reg = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
//mongodb://<dbuser>:<dbpassword>@ds157964.mlab.com:57964/jonbase

function isValidURL(url) {
  
  if (url.match(reg)){
  return true;
  } else {return false;
         }
  
  
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


//TODO: Make all responses JSON; ALSO the front-end is missing, but who cares


// http://expressjs.com/en/starter/basic-routing.html
app.get("/new/*", function (request, response) {
  
  var requestedURL = request.path.slice(5, request.path.length);
  if (isValidURL(requestedURL)){
    
  } else {
    response.send("Not a valid URL. Try again. Remember to include 'https'. Example: /n https://www.google.com");
  }
  
  
  var found = datab.serch(requestedURL, showNewIndex);
  function showNewIndex (num){
    response.send(JSON.stringify({"Message":"the index for the new page is " + num + "."}));
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
    
    function calbak(item){
      console.log("LOG");
      if(!item) {
        response.send(JSON.stringify({"message":"No such thing, silly human!"}));
      } else if (item[0]) {
        if(item[0].url.match(reg)){
          response.redirect(item[0].url);
        } else {
          response.send(JSON.stringify({"message":"This link appears to be corrupted. Please contact an angel for assistance."}));
        }
        //response.send(JSON.stringify({"original_url": item[0].url ,"shortened:": "https://smal-url.glitch.me/"+item[0]["shortened-value"]}));
        
        //response.redirect(item[0].url);
      } else {
        response.send(JSON.stringify({"message":"No such index, try creating one!"}));
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
