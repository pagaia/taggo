import Bookmark from "../models/bookmark.model.js";
import Tag2book from "../models/tag2book.model.js";

// Create and Save a new Bookmark
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.debug("req: ", req.body);
  // Create a Bookmark
  const bookmark = new Bookmark({
    uri: req.body.uri,
    name: req.body.name,
    active: req.body.active,
  });

  // Save Bookmark in the database
  Bookmark.create(bookmark, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bookmark.",
      });
    else res.send(data);
  });
};

// Retrieve all Bookmarks from the database.
exports.findAll = (req, res) => {
  Bookmark.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookmarks.",
      });
    else res.send(data);
  });
};

// Find a single Bookmark with a bookmarkId
exports.findOne = (req, res) => {
  Bookmark.findById(req.params.bookmarkId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bookmark with id ${req.params.bookmarkId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Bookmark with id " + req.params.bookmarkId,
        });
      }
    } else res.send(data);
  });
};

// Find Bookmark by Name
exports.findByName = (req, res) => {
  const { name } = req.params;
  Bookmark.findByName(name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bookmark with name ${name}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Bookmark with name " + name,
        });
      }
    } else res.send(data);
  });
};

// Find Bookmark by Tag
exports.findByTag = (req, res) => {
  const { tag } = req.params;
  Tag2book.findByTag(tag, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bookmark with tag ${tag}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Bookmark with tag " + tag,
        });
      }
    } else res.send(data);
  });
};

// Link Bookmark to Tag
exports.link = (req, res) => {
  const { bookmarkId, tag } = req.params;

  Tag2book.link({ bookmarkId, tag }, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error adding tag " + tag + " for Bookmark " + bookmarkId,
      });
    } else res.send(data);
  });
};

// Update a Bookmark identified by the bookmarkId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Bookmark.updateById(
    req.params.bookmarkId,
    new Bookmark(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Bookmark with id ${req.params.bookmarkId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Bookmark with id " + req.params.bookmarkId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Bookmark with the specified bookmarkId in the request
exports.delete = (req, res) => {
  Bookmark.remove(req.params.bookmarkId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bookmark with id ${req.params.bookmarkId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Bookmark with id " + req.params.bookmarkId,
        });
      }
    } else res.send({ message: `Bookmark was deleted successfully!` });
  });
};

// Delete all Bookmarks from the database.
exports.deleteAll = (req, res) => {
  Bookmark.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bookmarks.",
      });
    else res.send({ message: `All Bookmarks were deleted successfully!` });
  });
};
