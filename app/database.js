//this file handles all database interactions!
var mongo = require("mongodb").MongoClient;

var user = process.env.MONGODB_USER;
var pwd = process.env.MONGODB_PASSWORD;
var url = "mongodb://"+user+":"+pwd+"@ds157964.mlab.com:57964/jonbase";

var length;

exports.serch = function(string){
  mongo.connect(url, function(err, db){
    if (err) {throw err;}
    var coll = db.collection('urls');
    //console.log(coll.count());
    coll.find({"url":string},function(err,resp){
      if (err) {
        return null;
        throw err
      } else {
        console.log("resp: " + resp);
        return resp;
      }
      
    });
    
    db.close();
  });
}
/*module.exports = {
  FindinCol1 : function funk1(callback) {
    MongoClient.connect("mongodb://localhost:27017/db1", function (err,db) {
      if (err) {
        return console.dir(err);
      }
      var collection = db.collection('col1');
      collection.find().toArray(function (err, items) {
        console.log(items);       
        return callback(items);     
      });
    });
  }
};
Pass a callback function to FindinCol1:

a.FindinCol1(function(items) {
  console.log(items);
});*/
exports.findRedirect = function(num, callback){
  var res;
  mongo.connect(url, function(err, db){
    if(err){
      console.log(err);
      return err;
    }
    console.log("connecting...");
    var coll = db.collection("urls");    
    coll.find({"shortened-value":num}, function(err, data){
      if (err) {throw err;}
      var ret = data.toArray();
      return ret;
      
    }).then(function(items){
      console.log(items[0].url);
      if (items[0].url) {
        return callback(items[0].url);
      } else {
        return callback(null);
      }
    });  
    
    db.close();
    console.log(2);
    return res;
  });
  console.log(3);
  return res;
  //db.close();
}

exports.newRedirect = function (string, callback){
  mongo.connect(url, function(err, db){
    if (err) {
      throw err;
    }
    
    var coll = db.collection('urls');
    //var count = coll.count();
    //console.log("count: " + coll.count());
    
    coll.count({},function(err,resp){
      console.log("2 resp: "+ resp);
      console.log("3 resp: "+ (resp + 1));
      coll.insert({"url":string, "shortened-value": resp + 1},function(err, response){
        if(err) {throw err;}
        
         callback((parseInt(resp) + 1));
        //return resp + 1;
        db.close();
      
    });
      
    });
    
    
    
    /*coll.insert({"url":string, "shortened-value": count + 1},function(err, resp){
      if(err) {throw err;}
      
    });*/
  });
}


//Database address:
//mongodb://<dbuser>:<dbpassword>@ds157964.mlab.com:57964/jonbase