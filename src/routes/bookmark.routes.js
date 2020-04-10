import bookmarks from "../controllers/bookmark.controller.js";

const routes = (app) => {

  // Create a new Bookmark
  app.post("/bookmarks", bookmarks.create);

  // Retrieve all Bookmarks
  app.get("/bookmarks", bookmarks.findAll);

  // Retrieve a single Bookmark with bookmarkId
  app.get("/bookmarks/:bookmarkId", bookmarks.findOne);

  // Update a Bookmark with bookmarkId
  app.put("/bookmarks/:bookmarkId", bookmarks.update);

  // Delete a Bookmark with bookmarkId
  app.delete("/bookmarks/:bookmarkId", bookmarks.delete);

  // Create a new Bookmark
  app.delete("/bookmarks", bookmarks.deleteAll);
};

export default routes;
