const app = require('./app');
const connectDatabse = require('./config/database');

// config setting
const dotenv = require('dotenv');
dotenv.config({path: 'backend/config/config.env'});

const PORT = process.env.PORT;
connectDatabse();

app.listen(PORT, () =>{
    console.log(`Server is running on PORT : ${PORT}`);
})