import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      container
      justify="space-between"
      spacing={3}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={5} ml="12px">
        {/* <Typography variant="h3" color="primary">
          {"list Events"}
        </Typography> */}
      </Box>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
