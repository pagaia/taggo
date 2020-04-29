import axios from "axios";

// Make a request for a user with a given ID
export const getBookmarks = (tag) => {
  const url = tag ? `/api/bookmarks/tag/${tag}` : `/api/bookmarks`;

  return axios
    .get(url)
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
};
