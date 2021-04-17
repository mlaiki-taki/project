import React, { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Header from "./Header";
import Results from "./Results";
import { useSelector, useDispatch } from 'react-redux'
import Page from '../Page/Page'
import { getAllGroupe } from "../../Redux/Actions/groupe"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const EventView = (props) => {
  const classes = useStyles();
  const groupes = useSelector(state => state.groupe.groupes)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllGroupe())
  }, [groupes]);
  return (
    <Page>
      <Container maxWidth="md">
        <Header />
        <Box mt={6}>
          <Results
            groupes={groupes}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default EventView;
