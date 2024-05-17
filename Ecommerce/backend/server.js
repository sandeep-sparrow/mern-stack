// so this is our JS code...

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./utilities/db');
require('dotenv').config();

const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}!`));

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// uses param URL path and handler...
app.use('/api', require('./routes/authRoutes'));

app.get("/", (req, res) => res.send('My Backend!'));
