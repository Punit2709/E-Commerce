const express = require('express');
const cookieParser = require('cookie-parser');

// product routes
const product = require('./routers/productRoute');

// user router
const user = require('./routers/userRoute');

// Error middleware
const errorMiddleware = require('./middleware/error');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', product);
app.use('/api/v1', user);

app.use(errorMiddleware);
module.exports = app;