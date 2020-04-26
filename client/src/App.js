import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TopBar from "./components/TopBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ScrollTop from "./components/ScrollTop";
import Grid from "@material-ui/core/Grid";
import BookmarkList from "./components/Bookmark";
import { Toolbar, Typography } from "@material-ui/core";
import TagList from "./components/TagList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
function App() {
  const classes = useStyles();

  return (
    <div >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TopBar />
          <Toolbar id="back-to-top-anchor" />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid container spacing={2} direction="row">
            <Grid item sm={6}>
            <Typography variant="h3" component="h2">
                My Bookmark
              </Typography>
              <BookmarkList />
            </Grid>
            <Grid item sm={6}>
            <Typography variant="h3" component="h2" >
                My Tag
              </Typography>
              <TagList />
            </Grid>
          </Grid>
          <ScrollTop />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
