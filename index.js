

var express = require("express");
var app = express();
var port = 3000; 
var path = require("path");

app.set("view options", {layout: false});
app.use(express.static( path.join(__dirname, "/")));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname+ "/Index.html"))
})

// POST method route
app.post("/Models/Mails.cs/", function (req, res) {
     res.redirect("/Models/Mails.cs/")
   
  })

app.listen(port, function(){
    console.log("server running")
})  

