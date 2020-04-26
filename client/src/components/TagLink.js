import { Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles({
  link: {
    marginRight: '10px',
  },
});

const TagLink = ({ tag, tot }) => {
  const classes = useStyles();

  const preventDefault = (event) => event.preventDefault();
  return (
    <Link href="#" onClick={preventDefault} className={classes.link}>
      #{tag} ({tot})
    </Link>
  );
};

TagLink.prototype = {
  tag: PropTypes.string,
  tot: PropTypes.string,
};
export default TagLink;
