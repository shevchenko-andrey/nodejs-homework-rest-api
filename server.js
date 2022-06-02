const app = require("./app");
const mongoose = require("mongoose")
require("dotenv").config();
const {PORT=3000, DB_HOST} = process.env;

mongoose.connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .then(() => app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
})).catch(error => {
  console.log(error.message)
  process.exit(1)
})
