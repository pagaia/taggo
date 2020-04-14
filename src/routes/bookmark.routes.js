import bookmarks from "../controllers/bookmark.controller.js";

const routes = (app) => {

  // Create a new Bookmark
  app.post("/bookmarks", bookmarks.create);

  // Retrieve all Bookmarks
  app.get("/bookmarks", bookmarks.findAll);

  // Search Bookmarks by name
  app.get("/bookmarks/name/:name", bookmarks.findByName);

  // Add tag to Bookmark
  app.post("/bookmarks/:bookmarkId/:tag", bookmarks.link);

  // Search Bookmarks by tag
  app.get("/bookmarks/tag/:tag", bookmarks.findByTag);

  // Retrieve a single Bookmark with bookmarkId
  app.get("/bookmarks/:bookmarkId", bookmarks.findOne);

   // Search Bookmarks by name
   app.get("/bookmarks", bookmarks.findAll);

  // Update a Bookmark with bookmarkId
  app.put("/bookmarks/:bookmarkId", bookmarks.update);

  // Delete a Bookmark with bookmarkId
  app.delete("/bookmarks/:bookmarkId", bookmarks.delete);

};

export default routes;
