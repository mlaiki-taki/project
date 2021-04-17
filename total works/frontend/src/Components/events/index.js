import React, { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Header from "./Header";
import Results from "./Results";
import { useSelector, useDispatch } from 'react-redux'
import Page from '../Page/Page'
import { getAllEvent } from "../../Redux/Actions/event"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const EventView = () => {
  const classes = useStyles();
  const events = useSelector(state => state.event.events)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllEvent())
  }, []);
  return (
    <Page>
      <Container maxWidth="md">
        <Header />
        <Box mt={6}>
        <Results
            events={events}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default EventView;
