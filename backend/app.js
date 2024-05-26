const express = require('express');

// product routes
const product = require('./routers/productRoute');

// Error middleware
const errorMiddleware = require('./middleware/error');

const app = express();
app.use(express.json());
app.use(errorMiddleware);


app.use('/api/v1', product);
module.exports = app;