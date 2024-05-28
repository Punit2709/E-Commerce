const app = require('./app');
const connectDatabase = require('./config/database');
 
// handling uncaughtException
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shut down Server Due to Uncaught Exception`);
    process.exit(1);
});


// config setting
const dotenv = require('dotenv');
dotenv.config({path: 'backend/config/config.env'});

const PORT = process.env.PORT;
connectDatabase();

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