import sql from "./db.js";

// constructor
const Tag2book = function (link) {
  console.debug("link: ", link);
  this.bookId = link.bookId;
  this.tagId = link.tagId;
};

Tag2book.create = ({ bookmarkId, tag }, result) => {
  sql.query(
    `CALL LinkBook2Tag (?,?, @pTagId);`,
    [bookmarkId, tag],
    (err, res) => {
      if (err) {
        console.log("error: ", err, bookmarkId, tag);
        result(err, null);
        return;
      }

      sql.query(`SELECT @pTagId;`, (err, res) => {
        if (err) {
          console.log("error: ", err, bookmarkId, tag);
          result(err, null);
          return;
        }

        console.log("created tag2book: ", { id: res.pTagId });
        result(null, { id: res.pTagId });
      });
    }
  );
} ;

Tag2book.findByTag = (name, result) => {
  sql.query(
    `SELECT * FROM bookmark b 
    INNER JOIN tag2book t2b on t2b.bookId = b.id
    INNER JOIN tag t on t2b.tagId=t.id
    WHERE t.name like ?`,
    "%" + name + "%",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found tag2book with the name
      result({ kind: "not_found" }, null);
    }
  );
};

Tag2book.remove = ({ bookId, tagId }, result) => {
  sql.query(
    "DELETE FROM tag2book WHERE bookId = ? AND tagId = ? ",
    [bookId, tagId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tag2book
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted tag2book with bookId: ", id);
      result(null, res);
    }
  );
};

export default Tag2book;
