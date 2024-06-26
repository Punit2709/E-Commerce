const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config({path: 'backend/config/config.env'});

// product routes
const product = require('./routers/productRoute');

// user router
const user = require('./routers/userRoute');

// order router
const order = require('./routers/orderRoute');

// payment route
const payment = require('./routers/paymentRoute');

// Error middleware
const errorMiddleware = require('./middleware/error');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());


app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use(express.static(path.join(__dirname, "../Frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"));
  });

app.use(errorMiddleware);
module.exports = app;