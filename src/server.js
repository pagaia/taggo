import express from "express";
import bodyParser  from "body-parser";
import routes from "./routes/bookmark.routes.js"

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to pagaia test application." });
});

routes(app);


// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});