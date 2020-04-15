import tags from "../controllers/tag.controller.js";

const routes = (app) => {

  // Create a new Tag
  app.delete("/api/tags", tags.deleteAll);

  // Create a new Tag
  app.post("/api/tags", tags.create);

  // Retrieve all Tags
  app.get("/api/tags", tags.findAll);

  // Search Tags by name
  app.get("/api/tags/name/:name", tags.findByName);

  // Retrieve a single Tag with tagId
  app.get("/api/tags/:tagId", tags.findOne);

  // Update a Tag with tagId
  app.put("/api/tags/:tagId", tags.update);

  // Delete a Tag with tagId
  app.delete("/api/tags/:tagId", tags.delete);

  // Create a new Tag
  app.delete("/api/tags", tags.deleteAll);

};

export default routes;
