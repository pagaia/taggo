import sql from "./db.js";

// constructor
const Tag2book = function (link) {
  console.debug("link: ", link);
  this.bookId = link.bookId;
  this.tagId = link.tagId;
};

const insertLink = (conn, bookmarkId, tagId, callBack) => (
  error,
  results,
  fields
) => {
  if (error) {
    console.error("insertLink error: ", error)
    return conn.rollback(function () {
      callBack(error, null);
    });
  }
  const id = tagId || results.insertId;

  conn.query(
    "INSERT IGNORE INTO tag2book (bookId, tagId) VALUES (?, ?);",
    [bookmarkId, id],

    function (error, results, fields) {
      if (error) {
        return conn.rollback(function () {
          callBack(error, null);
        });
      }

      conn.commit(function (err) {
        if (err) {
          return conn.rollback(function () {
            callBack(error, null);
          });
        }
        callBack(null, results.id);
        console.log("success!");
      });
    }
  );
};

Tag2book.link = ({ bookmarkId, tag }, callBack) => {
  sql.getConnection(function (err, conn) {
    conn.beginTransaction(function (err) {
      if (err) {
        console.log("Error: ", err);
        callBack(err, null);
      }
      conn.query("SELECT id FROM tag WHERE name = ?;", tag, function (
        error,
        results,
        fields
      ) {
        console.log("SELECT id FROM tag WHERE name = ?: ", tag)
        if (error) {
          return conn.rollback(function () {
            console.log("Error: ", error);
            callBack(error, null);
          });
        }

        console.log("results ", results)

        if (!results[0] || !results[0].id) {
         
          conn.query(
            "INSERT INTO tag (name) VALUES (?) ;",
            tag,
            insertLink(conn, bookmarkId, undefined, callBack)
          );
        } else {
          insertLink(conn, bookmarkId, results[0].id, callBack)();
        }
      });
    });
  });
};

Tag2book.findByTag = (name, result) => {
  sql.query(
    `SELECT b.name, b.uri, b.uuid, t.name as tag FROM bookmark b 
    INNER JOIN tag2book t2b on t2b.bookId = b.id
    INNER JOIN tag t on t2b.tagId=t.id
    WHERE t.name like ?
    ORDER BY b.name`,
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


Tag2book.findAll = (result) => {
  sql.query(
    `SELECT b.name, b.uri, b.uuid, t.name as tag FROM bookmark b 
    LEFT JOIN tag2book t2b on t2b.bookId = b.id
    LEFT JOIN tag t on t2b.tagId=t.id
    ORDER BY b.name`,
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
