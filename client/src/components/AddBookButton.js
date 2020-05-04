import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function AddBookButton({ handleClick }) {
  const classes = useStyles();

  return (
    <div onClick={handleClick} role="presentation" className={classes.root}>
      <Fab color="primary" size="small" aria-label="Add a new bookmark">
        <AddIcon />
      </Fab>
    </div>
  );
}

AddBookButton.propTypes = {
  handleClick: PropTypes.func,
};
export default AddBookButton;
