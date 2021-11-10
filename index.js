// Creating express application
const express = require("express");
const app = express();

// Middleware to parse Json
app.use(express.json());

// Middleware to parse incoming urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Dotenv to let us access enviourmnet variable
const dotenv = require("dotenv");
dotenv.config();

require("./Database/database");

// To let us make req for one site to another and one localhost to another
const cors = require("cors");
app.use(cors());
// Including all the routes
const routerPath = require("./Routes/router");
app.use(("/", routerPath));

app.listen(process.env.PORT || 5000, () =>
  console.log(" ------------ ------------1.  Server is running at port : 5000")
);
