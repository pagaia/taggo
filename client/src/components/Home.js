import React, { useEffect } from "react";
import { Toolbar, Typography, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import BookmarkList from "./Bookmark";
import ScrollTop from "./ScrollTop";
import TagList from "./TagList";
import TopBar from "./TopBar";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    padding: "0 16px",
  },
});

const Home = (props) => {
  const { tag } = useParams();
  const classes = useStyles();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    if (tag) {
      document.title = `Taggo App - ${tag} `;
    } else {
      document.title = `Taggo App`;
    }
  }, [tag]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <TopBar />
        <Toolbar id="back-to-top-anchor" />
      </Grid>
      <Grid item xs={12} sm container>
        <Grid container spacing={2} direction="row">
          <Grid item sm={6}>
            <Typography variant="h3" component="h2" className={classes.title}>
              My Bookmark
            </Typography>
            <BookmarkList tag={tag} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h3" component="h2" className={classes.title}>
              My Tag
            </Typography>
            <TagList />
          </Grid>
        </Grid>
        <ScrollTop />
      </Grid>
    </Grid>
  );
};

export default Home;
