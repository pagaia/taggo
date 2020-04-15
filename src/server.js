import express from "express";
import bodyParser from "body-parser";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import path from 'path';

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// simple route
app.get("/api/test", (req, res) => {
  res.json({ message: "Welcome to pagaia test application." });
});

bookmarkRoutes(app);
tagRoutes(app);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
