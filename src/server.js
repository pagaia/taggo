import express from "express";
import bodyParser from "body-parser";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import tagRoutes from "./routes/tag.routes.js";

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to pagaia test application." });
});

bookmarkRoutes(app);
tagRoutes(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
