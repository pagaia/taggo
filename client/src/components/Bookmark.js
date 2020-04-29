import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { getBookmarks } from "../api/fetchBookmark";
import Book from "./Book";

const BookmarkList = ({ tag }) => {
  const [bookmarks, setBookmarks] = React.useState([]);

  const fetchBook = (tag) => {
    getBookmarks(tag).then((response) => {
      setBookmarks(response.data);
    });
  };

  useEffect(() => {
    fetchBook(tag);
  }, [tag]);

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
