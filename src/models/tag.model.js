import sql from "./db.js";

// constructor
const Tag = function (tag) {
  console.debug("tag: ", tag);
  this.name = tag.name;
  this.active = tag.active;
};

Tag.create = (newTag, result) => {
  sql.query("INSERT INTO tag SET ?", newTag, (err, res) => {
    if (err) {
      console.log("error: ", err, newTag);
      result(err, null);
      return;
    }

    console.log("created tag: ", { id: res.insertId, ...newTag });
    result(null, { id: res.insertId, ...newTag });
  });
};

Tag.findById = (tagId, result) => {
  sql.query(`SELECT * FROM tag WHERE id = ${tagId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tag: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tag with the id
    result({ kind: "not_found" }, null);
  });
};

Tag.findExactName = (name, result) => {
  sql.query(`SELECT * FROM tag WHERE name = ?`, name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found tag with the name
    result({ kind: "not_found" }, null);
  });
};

Tag.findByName = (name, result) => {
  sql.query(
    `SELECT * FROM tag WHERE name like ?`,
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

      // not found tag with the name
      result({ kind: "not_found" }, null);
    }
  );
};

Tag.getAll = (result) => {
  sql.query(
    `SELECT tag.name as tag, count(*) as tot 
  FROM tag join tag2book on tag.id=tag2book.tagId GROUP BY tag.name;`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("tag: ", res);
      result(null, res);
    }
  );
};

Tag.updateById = (id, tag, result) => {
  sql.query(
    "UPDATE tag SET name = ?, active = ? WHERE id = ?",
    [tag.name, tag.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tag with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tag: ", { id: id, ...tag });
      result(null, { id: id, ...tag });
    }
  );
};

Tag.remove = (id, result) => {
  sql.query("DELETE FROM tag WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tag with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tag with id: ", id);
    result(null, res);
  });
};

Tag.removeAll = (result) => {
  sql.query("DELETE FROM tag", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tag`);
    result(null, res);
  });
};

export default Tag;
