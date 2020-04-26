import axios from "axios";

const getTags = () =>
  axios
    .get("/api/tags")
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

export default getTags;
