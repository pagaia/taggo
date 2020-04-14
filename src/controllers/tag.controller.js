import Tag from "../models/tag.model.js";

// Create and Save a new Tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.debug("req: ",req.body )
  // Create a Tag
  const tag = new Tag({
    name: req.body.name,
    active: req.body.active,
  });

  // Save Tag in the database
  Tag.create(tag, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tag.",
      });
    else res.send(data);
  });
};

// Retrieve all tags from the database.
exports.findAll = (req, res) => {
  Tag.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tags.",
      });
    else res.send(data);
  });
};

// Find a single Tag with a tagId
exports.findOne = (req, res) => {
  Tag.findById(req.params.tagId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tag with id ${req.params.tagId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tag with id " + req.params.tagId,
        });
      }
    } else res.send(data);
  });
};

// Find Tag by Name
exports.findByName = (req, res) => {
  Tag.findByName(req.query.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tag with name ${req.query.name}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tag with name " + req.query.name,
        });
      }
    } else res.send(data);
  });
};

// Update a Tag identified by the tagId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Tag.updateById(
    req.params.tagId,
    new Tag(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tag with id ${req.params.tagId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Tag with id " + req.params.tagId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tag with the specified tagId in the request
exports.delete = (req, res) => {
  Tag.remove(req.params.tagId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tag with id ${req.params.tagId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tag with id " + req.params.tagId,
        });
      }
    } else res.send({ message: `Tag was deleted successfully!` });
  });
};


// Delete all tags from the database.
exports.deleteAll = (req, res) => {
  Tag.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tags.",
      });
    else res.send({ message: `All tags were deleted successfully!` });
  });
};
