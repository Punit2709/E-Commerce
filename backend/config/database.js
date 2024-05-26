const mongoose = require("mongoose");

const connectDatabse = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) =>
      console.log(`Mongo DB Connected with ${data.connection.host}`)
    )
    .catch((error) => console.log(error));
};

module.exports = connectDatabse;
