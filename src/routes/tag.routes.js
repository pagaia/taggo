import tags from "../controllers/tag.controller.js";

const routes = (app) => {

  // Create a new Tag
  app.delete("/tags", tags.deleteAll);

  // Create a new Tag
  app.post("/tags", tags.create);

  // Retrieve all Tags
  app.get("/tags", tags.findAll);

  // Search Tags by name
  app.get("/tags/name/:name", tags.findByName);

  // Retrieve a single Tag with tagId
  app.get("/tags/:tagId", tags.findOne);

  // Update a Tag with tagId
  app.put("/tags/:tagId", tags.update);

  // Delete a Tag with tagId
  app.delete("/tags/:tagId", tags.delete);

  // Create a new Tag
  app.delete("/tags", tags.deleteAll);

};

export default routes;
