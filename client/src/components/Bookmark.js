import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React, { useEffect } from "react";
import getBookmarks from "../api/fetchBookmark";
import Book from "./Book";

const BookmarkList = (props) => {
  const [bookmarks, setBookmarks] = React.useState([]);

  const fetchBook = () => {
    getBookmarks().then((response) => {
      setBookmarks(response.data);
    });
  };

  useEffect(() => {
    fetchBook();
  }, []);

  console.log("bookmarks: ", bookmarks);
  return (
    <List>
      {bookmarks.map((book, index) => (
        <ListItem key={book.id}>
          <Book book={book} />
        </ListItem>
      ))}
    </List>
  );
};

export default BookmarkList;
