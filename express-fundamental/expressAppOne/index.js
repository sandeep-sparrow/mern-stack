var express = require('express');
var bodyParser = require('body-parser');
var multer =  require('multer');

// define app and add listener function...
app = express();
app.use(bodyParser.json());
// app.use(multer().array());
// app.use(express.static('public'));

app.listen(8080, function(){
    console.log("Server run successfully");
});

// getting request query data, get data from request header
app.get("/", function(req, res){

    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let email = req.header('email');

    res.end("This is a simple end String response query " + firstName + " " + lastName + " " + email);
});

// post request with Query and Header Properties
app.post("/", function(req, res){

    // post application.json - json request body object
    let jsonData = req.body;
    let jsonString = JSON.stringify(jsonData);

    let firstName = req.query.firstName;
    let lastName = req.query.lastName;

    let email = req.header('email');
    let password = req.header('password');

    res.send(firstName + " " + lastName + " " +  email + " " + password +  " " + jsonString);
});

// multi-part data
app.post("/multi-part-form", function(req, res){
    let JSONData = req.body;
    res.send(JSON.stringify(JSONData));
});

var storage = multer.diskStorage({
    destination:function(req, file, callBack){
        callBack(null, './uploads');
    },
    filename:function(req, file, callBack){
        callBack(null, file.originalname);
    }
});

var upload = multer({storage:storage}).single('myfile');

// manager file upload using express JS...
app.post("/upload", function(req, res){
    upload(req, res, function(error){
        if(error){
            res.send("File Upload failed!");
        }else{
            res.send("File Upload success!");
        }
    })
})

// configure monogdb...