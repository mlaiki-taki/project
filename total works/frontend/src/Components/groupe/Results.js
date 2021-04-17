import React, { useEffect } from "react";
import clsx from "clsx";

import {
  Box,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';
import GroupeCard from ".//GroupeCard";

const useStyles = makeStyles(theme => ({
  root: {},
  emptyPage: {
    textAlign: 'center',
    padding: 50,
  },
  loaderPage: {
    textAlign: 'center',
    padding: 50,
  },
  emptySearchResult: {
    margin: "15% auto",
    width: "60%",
    padding: "10px",
    textAlign: "center"
  }
}));


const Results = ({ className, groupes,  ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {groupes.length === 0 && (
        <div className={classes.emptyPage}>
          <Box>
            <Typography variant="h4" color="textSecondary">
              {"No Groupes"}
            </Typography>
          </Box>
        </div>
      )}
      <Grid container direction="column" spacing={3} display="block">
        {groupes.map(groupe => (
          <Grid item key={groupe._id} md={12} xs={12}>
             <GroupeCard groupe={groupe} /> 
         </Grid>
        ))}
      </Grid>
    </div>
  );
};



export default Results;
