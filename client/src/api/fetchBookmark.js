import axios from "axios";

// Make a request for a user with a given ID
const getBookmarks = () =>
  axios
    .get("/api/bookmarks")
    .then(function (response) {
      // handle success
      console.log(response);
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log("finally ended");
      console.log(response);
      return response;

    });

export default getBookmarks;
