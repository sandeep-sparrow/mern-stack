/*
    EngineeringWithSandeep - nodeJS and mongoDB
    series
*/

// Import Library / module
// aka mongoDB API
const mongoose = require('mongoose');

// Let's Connect to our LOCAL DB
// using the mongoDB API
mongoose.connect('mongodb://0.0.0.0:27017/local')
    .then(() => console.log("DB is Connected!"))
    .catch((error) => console.log(error));

// that is it, let's test this in CLI/Terminal
// success we have been connected to local DB

// now, let's create Schema & Model 
// in MongoDB document is like a normal Table 
// which is in RDBMS, a group of such document's
// is called Collection and group of such collection
// is called Database, in above example
// we connected to a DB named test, 
// in part we will create a Schema & Model 
// aka document / table
// in test database

// let's Code
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isMarried: Boolean,
    salary: Number,
    gender: String,
});
// that's it out Schema is ready
// above is a User Document with each 
// attribute it's name ans data type

// Model instance
const User = mongoose.model('User', userSchema);
// let's rerun the code
// Success, we can see a Users Documents which
// is the plural form of User we passed as model
// is created

// now, let's insert some data or 
// save some user to it...

// Save Object i.e. user OBJ - Part 3
async function storeInformation(){
    const user = new User({
        name: "Sandeep",
        age: 29,
        isMarried: false,
        salary: 10000,
        gender: "Male",
    });
    await user.save();
    console.log(user);
};

// let's test this...
// storeInformation();
// Success we can see some console log
// let's check in Compass Application...

// great we verified our User OBJ is presisted and
// saved to local MONGO DB server...

// next, let us know how to get or
// find user based on certain search criteris...
// before that let's add some dummy data....

// done we have added the data

// now, let's find all object data
async function fetchAllInformation(){
    const users = await User.find({isMarried: true}).select('-name -salary');
    // the above find method of User Model instance
    // with empty value return  
    // all the result present
    // in our users documents
    // let's verify this...
    console.log('Count: ' + users.length);
    console.log(users);
};

// fetchAllInformation();
// let's try it out....
// GREAT, hope you have learned from this...

async function excludeSalary(){
    const users = await User.find({}).select("-salary");
    console.log('Count: ' + users.length);
    console.log(users);
}

// excludeSalary();

async function onlyNameAndSalary(){
    const users = await User.find({}).select("name salary");
    console.log('Count: ' + users.length);
    console.log(users);
}

// onlyNameAndSalary();

async function onlyNameAndSalarySortAsc(){
    const users = await User.find({}).select("name salary").sort('salary');
    console.log('Count: ' + users.length);
    console.log(users);
};

// onlyNameAndSalarySortAsc();

async function onlyNameAndSalarySortDesc(){
    const users = await User.find({}).select("name salary").sort('-salary');
    console.log('Count: ' + users.length);
    console.log(users);
};

// onlyNameAndSalarySortDesc();

async function onlyAgeGte30(){
    const users = await User.find({age: {$gte: 30}}).select('name age');
    console.log(users);
}

// onlyAgeGte30();

async function onlyAgeLte30(){
    const users = await User.find({age: {$lte: 30}}).select('name age');
    console.log(users);
}

// onlyAgeLte30();


// so far we saw how to connect to local mongodb server
// how to insert record, how to create document and it's schema
// how to get or find records in the document....

// now we will try to update a specific user record
// here we have async function ready..
// let's code it
async function updateUserAgeAndMarriageStatus_Method1(){
    // step1: get the user
    const user = await User.findById('663b17e826529fadf4d5fb6e');
    // 663b17e826529fadf4d5fb6e is out user id
    // Step2: update the values..
    user.age = 30;
    user.isMarried = true;
    // Step3: save it to db
    user.save();
}

// here we invoke the function...
// updateUserAgeAndMarriageStatus_Method1();
// now let's test this..
// before we test let's see the existing 
// data...
// Great! SUCCESS we are able to update the 
// target record..
// THANKS FOR WATCHING
// LET ME KNOW YOUR DOUBTS IN COMMENTS 
// SECTION BELOW!

async function updateUserAgeAndMarriageStatus_Method2(){
    const user = await User.findByIdAndUpdate(
        '663b17e826529fadf4d5fb6e', 
        {
            age: 32, isMarried: true
        }, 
        {
            new: true,
            runValidators: true
        }
    );
};

updateUserAgeAndMarriageStatus_Method2();

// deletion
async function deleteOne_Method1(){
    await User.deleteOne({_id: '663b17e826529fadf4d5fb6e'});
};