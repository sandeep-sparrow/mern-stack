// so this is our JS code...

const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}!`));

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./routes/authRoutes'));

app.get("/", (req, res) => res.send('My Backend!'));
