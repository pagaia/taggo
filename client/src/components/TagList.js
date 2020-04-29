import React, { useEffect } from "react";
import getTags from "../api/fetchTag";
import TagLink from "./TagLink";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    padding: "0 16px",
  },
});

const TagList = (props) => {
  const [tags, setTags] = React.useState([]);
  const classes = useStyles();

  const fetchTag = () => {
    getTags().then((response) => {
      setTags(response.data);
    });
  };

  useEffect(() => {
    fetchTag();
  }, []);

  return (
    <div className={classes.title}>
      {tags.map((tag, index) => (
        <TagLink key={tag.tag} {...tag} />
      ))}
    </div>
  );
};

export default TagList;
