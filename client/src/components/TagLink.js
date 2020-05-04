import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    marginRight: "10px",
  },
});

const TagLink = ({ tag, tot }) => {
  const classes = useStyles();

  if (!tag) {
    return null;
  }
  return (
    <Link to={`/tag/${tag}`} className={classes.link}>
      #{tag} {tot && `(${tot})`}
    </Link>
  );
};

TagLink.prototype = {
  tag: PropTypes.string,
  tot: PropTypes.string,
};
export default TagLink;
