var express = require("express");
var path = require("path");
var mongoose = require('mongoose');

var app = express();

var things = require('./routes/things');
var index = require('./routes/index');

var mongoURI = "mongodb://localhost:27017/lecture";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
   if(err){
      console.log("Mongo Error: ", err);
   }

});

mongoDB.once('open', function(){
   console.log("Connected to MongoDB!!");
});


var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));

app.set("port", (process.env.PORT || 5000));

app.use("/things", things);
app.use("/", index);

app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});