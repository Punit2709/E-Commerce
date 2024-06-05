const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// product routes
const product = require('./routers/productRoute');

// user router
const user = require('./routers/userRoute');

// order router
const order = require('./routers/orderRoute');

// Error middleware
const errorMiddleware = require('./middleware/error');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);

app.use(errorMiddleware);
module.exports = app;