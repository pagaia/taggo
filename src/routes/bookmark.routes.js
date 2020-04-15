import bookmarks from "../controllers/bookmark.controller.js";

const routes = (app) => {

  // Create a new Bookmark
  app.post("/api/bookmarks", bookmarks.create);

  // Retrieve all Bookmarks
  app.get("/api/bookmarks", bookmarks.findAll);

  // Search Bookmarks by name
  app.get("/api/bookmarks/name/:name", bookmarks.findByName);

  // Add tag to Bookmark
  app.post("/api/bookmarks/:bookmarkId/:tag", bookmarks.link);

  // Search Bookmarks by tag
  app.get("/api/bookmarks/tag/:tag", bookmarks.findByTag);

  // Retrieve a single Bookmark with bookmarkId
  app.get("/api/bookmarks/:bookmarkId", bookmarks.findOne);

   // Search Bookmarks by name
   app.get("/api/bookmarks", bookmarks.findAll);

  // Update a Bookmark with bookmarkId
  app.put("/api/bookmarks/:bookmarkId", bookmarks.update);

  // Delete a Bookmark with bookmarkId
  app.delete("/api/bookmarks/:bookmarkId", bookmarks.delete);

};

export default routes;
