const app = require('./app');
const connectDatabase = require('./config/database');

// config setting
const dotenv = require('dotenv');
dotenv.config({path: 'backend/config/config.env'});

const PORT = process.env.PORT;
connectDatabase();

app.listen(PORT, () =>{
    console.log(`Server is running on PORT : ${PORT}`);
})