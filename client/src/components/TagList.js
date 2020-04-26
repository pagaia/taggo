import React, { useEffect } from "react";
import getTags from "../api/fetchTag";
import TagLink from "./TagLink";

const TagList = (props) => {
  const [tags, setTags] = React.useState([]);

  const fetchTag = () => {
    getTags().then((response) => {
      setTags(response.data);
    });
  };

  useEffect(() => {
    fetchTag();
  }, []);

  console.log("tags: ", tags);
  return tags.map((tag, index) => <TagLink key={tag.tag} {...tag} />);
};

export default TagList;
