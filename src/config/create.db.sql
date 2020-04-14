DROP DATABASE taggo;
CREATE DATABASE IF NOT EXISTS taggo;
USE taggo;

CREATE TABLE IF NOT EXISTS `bookmark` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  uuid varchar(48) NOT NULL UNIQUE,
  uri varchar(255) NOT NULL,
  name varchar(255) NOT NULL UNIQUE,
  active BOOLEAN DEFAULT true
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE IF NOT EXISTS `tag` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  uuid varchar(48) NOT NULL UNIQUE,
  name varchar(255) NOT NULL UNIQUE,
  active BOOLEAN DEFAULT true
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- add uuid to bookmark when creating
DELIMITER ;;
CREATE TRIGGER bookmark_uuid BEFORE
INSERT ON bookmark FOR EACH ROW BEGIN IF new.uuid IS NULL THEN
SET
  new.uuid = uuid();
END IF;
END ;;


-- add uuid to tag when creating
-- DELIMITER ;;
CREATE TRIGGER tag_uuid BEFORE
INSERT ON tag FOR EACH ROW BEGIN IF new.uuid IS NULL THEN
SET
  new.uuid = uuid();
END IF;
END ;;

CREATE TABLE IF NOT EXISTS `tag2book` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  bookId INT NOT NULL,
  tagId INT NOT NULL,
  FOREIGN KEY (bookId) REFERENCES bookmark(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (tagId) REFERENCES tag(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE PROCEDURE LinkBook2Tag(
    IN  pBookId INT, IN pTag varchar(255), OUT pTagId INT
)
BEGIN

    SELECT id INTO pTagId
    FROM tag
    WHERE name = pTag;

    IF true THEN
        INSERT INTO tag (name) VALUES (pTag);
        SELECT LAST_INSERT_ID() INTO pTagId;
    END IF;

   INSERT INTO tag2book (bookId, tagId) VALUES (pBookId, pTagId);
   
END ;;

DELIMITER ;
