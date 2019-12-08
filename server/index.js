const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const routes = require("./routes");

const app = express();
// Loads environment variables from a .env file to process.env
dotenv.config();

// Middlewares
// Enables all cors requests
app.use(cors());
// HTTP request logger
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

const port = process.env.PORT || 6000;
// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
