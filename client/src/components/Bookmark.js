import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { getBookmarks } from "../api/fetchBookmark";
import Book from "./Book";

const BookmarkList = ({ tag }) => {
  const [bookmarks, setBookmarks] = React.useState([]);

  const groupBookAndSet = (list) => {
    const groupList = {};
    list &&
      list.forEach((element) => {
        if (!groupList[element.uuid]) {
          groupList[element.uuid] = { ...element, tags: [element.tag] };
        } else {
          groupList[element.uuid].tags = [
            ...groupList[element.uuid].tags,
            element.tag,
          ];
        }
      });
    setBookmarks(Object.values(groupList));
  };

  const fetchBook = (tag) => {
    getBookmarks(tag).then((response) => {
      groupBookAndSet(response.data);
    });
  };

  useEffect(() => {
    fetchBook(tag);
  }, [tag]);

  console.log("bookmarks: ",bookmarks)
  return (
    <List>
      {bookmarks.map((book, index) => (
        <ListItem key={book.uuid}>
          <Book book={book} />
        </ListItem>
      ))}
    </List>
  );
};

BookmarkList.propTypes = {
  /**
   * the tag to search for
   */
  tag: PropTypes.string,
};
export default BookmarkList;
