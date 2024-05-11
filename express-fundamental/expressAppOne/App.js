var express = require('express');

app = express();

// can do specific rout middleware validation...
app.use("/about", function(req, res, next){ // Applicable to all the App's URL...
    console.log("I am from middleware valiation");
    next();
});

app.listen(8080, function(){
    console.log("Server run success!");
});

app.get("/", function(req, res){
    res.send("This is home page");
});

app.get("/about", function(req, res){
    res.send("This is about page");
});

app.get("/contact", function(req, res){
    res.send("This is contact page");
});

// Application middleware? - for total application area...
