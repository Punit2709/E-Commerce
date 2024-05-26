const app = require('./app');
const connectDatabse = require('./config/database');

// config setting
const dotenv = require('dotenv');
dotenv.config({path: 'backend/config/config.env'});

const PORT = process.env.PORT;
connectDatabse();

const server = app.listen(PORT, () =>{
    console.log(`Server is running on PORT : ${PORT}`);
})

// unhandled Promise Rejection 
// like DB connection fail... etc

process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shut down Server Due to Unhandled Error`);

    server.close(() => {
        process.exit(1);
    });
});