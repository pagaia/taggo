import sql from "./db.js";

// constructor
const Bookmark = function (book) {
  console.debug("book: ", book)
  this.uri = book.uri;
  this.name = book.name;
  this.active = book.active;
};

Bookmark.create = (newBookmark, result) => {
  sql.query("INSERT INTO bookmarks SET ?", newBookmark, (err, res) => {
    if (err) {
      console.log("error: ", err,newBookmark);
      result(err, null);
      return;
    }

    console.log("created bookmark: ", { id: res.insertId, ...newBookmark });
    result(null, { id: res.insertId, ...newBookmark });
  });
};

Bookmark.findById = (bookmarkId, result) => {
  sql.query(`SELECT * FROM bookmarks WHERE id = ${bookmarkId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found bookmark: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found bookmark with the id
    result({ kind: "not_found" }, null);
  });
};

Bookmark.getAll = (result) => {
  sql.query("SELECT * FROM bookmarks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bookmarks: ", res);
    result(null, res);
  });
};

Bookmark.updateById = (id, bookmark, result) => {
  sql.query(
    "UPDATE bookmarks SET uri = ?, name = ?, active = ? WHERE id = ?",
    [bookmark.uri, bookmark.name, bookmark.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found bookmark with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated bookmark: ", { id: id, ...bookmark });
      result(null, { id: id, ...bookmark });
    }
  );
};

Bookmark.remove = (id, result) => {
  sql.query("DELETE FROM bookmarks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Bookmark with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted bookmark with id: ", id);
    result(null, res);
  });
};

Bookmark.removeAll = (result) => {
  sql.query("DELETE FROM bookmarks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} bookmarks`);
    result(null, res);
  });
};

export default Bookmark;
