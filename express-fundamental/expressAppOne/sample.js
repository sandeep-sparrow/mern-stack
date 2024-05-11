var express = require('express');
var bodyParser = require('body-parser');

// define app and add listener function...
app = express();
app.use(bodyParser.json());

app.listen(8080, function(){
    console.log("Server run successfully!");
});

// initial app setup is ready

// Method 1: Send
app.get("/home", function(req, res){
    res.send("Home Page");
})

app.get("/about", function(req, res){
    res.send("About Page");
})

app.get("/contact", function(req, res){
    res.send("Contact Page");
})

// Method 2: json response
app.get("/json", function(req, res){
    res.json(jsonMessage);
});

// our sample json object - pass this as args to json method
const jsonMessage = [
    {
        name: "John",
        email: "john@yahoo.com",
    },
    {
        name: "Ajay",
        email: "ajay@yahoo.com",
    },
    {
        name: "Margi",
        email: "margi@yahoo.com",
    },
];

// Method 3: response redirect
app.get("/usa", function(req, res){
    res.redirect("http://localhost:8080/india");
});

app.get("/india", function(req, res){
    res.send("Welcome to India!");
});

// Note: the URL path has to be a valid URL..let's test this

// Method 4: response header
app.get("/sample", function(req, res){
    res.append("City", "Ahmedabad");
    res.append("Name", "Sandeep");

    res.send("This is a sample Response Header test!");
    // ok, let's test this in our postman
    // Great this works
});

// Method 5: response set cookies
app.get("/set/cookies", function(req, res){
    res.cookie("Name", "Sandeep"); // this method takes in K, V pair
    res.cookie("Email", "Sandeep.p4856@gmail.com");

    res.end("Response Set Cookie was Success!");
    // ok, let's test this...
    // DONE THANK YOU!
});

// Method 6: response clear cookies
app.get("/clear/cookies", function(req, res){
    res.clearCookie("Name");
    res.clearCookie("Email");

    res.end("Response Clear Cookie was Success!");
    // DONE THANK YOU!!
})

// so far we discussed about response methods..
// in this new series let's disuss about request methods
// Method 1: request query
app.get("/example1", function(req, res){
    let firstName =  req.query.firstName;
    let lastName = req.query.lastName;

    res.send(firstName + " " + lastName);
});
// let's test this..in postman
// DONE THANK YOU !!

// Method 2: request header parameter
app.get("/example2", function(req, res){
    let name = req.header('name');
    let email = req.header('email');

    res.send("Header Paraneters: " + name + " " + email);
});
// Ok we are done with coding the header requesr parameter
// let's test in postman
// Great, Thanks for watching!

// Method 3: request body - commonly called as payload
// which is usually in JSON format...
app.get("/example3", function(req, res){
    let JSONData = req.body;
    let jsonString = JSON.stringify(JSONData);
    res.send(jsonString);
});
// done, let's test this in postman
// so for this we need to conver the JSON
// object to String
// let's try again
// success, Thanks!