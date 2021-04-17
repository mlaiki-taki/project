import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Box,
  Card,
  Divider,
  makeStyles,
  CardContent,
  Typography,
  Button
} from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux'
import Countdown from 'countdown-js'

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiInput-underline:before": {
      display: "none"
    },
    "& .MuiInput-underline:hover:before": {
      display: "none"
    },
    "& .MuiInput-underline:after": {
      display: "none"
    },
    "& .MuiAutocomplete-input:first-child": {
      fontSize: 14
    },
  },
  mediaPhoto: {
    marginRight: 16,
    width: "300px",
    height: "100px",
    backgroundColor: "#bdbdbd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    // position: "relative"
  },
}));

const EventCard = ({ className, event, ...rest }) => {
  const classes = useStyles();
  const [openDetail, setOpenDetail] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const user = useSelector(state => state.user.user)
 
  const handleParticipate = () => {
  }

  const countDoun = (endDate) => {
    let end = new Date(endDate)
    Countdown.timer(end, (timeLeft) => {
      setTimeLeft(`${timeLeft.days} :${timeLeft.hours}:${timeLeft.minutes}`)
    }, () => {
    })
  }
  const handleOpenDetail = () => {
    setOpenDetail(!openDetail)
    countDoun(event.departure)

  }
  return (
    <>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <img
              alt="img-parent-Post"
              className={classes.mediaPhoto}
              src={event?.media[0]}
            ></img>
            <Box
              p={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box> <Typography
                style={{ "font-weight": "bold" }}
                variant="h6"
              >
                {event.title}
              </Typography>
              </Box>
              {timeLeft &&
                <Box>
                  {openDetail && <span style={{ "font-weight": "bold" }} >
                    {timeLeft}
                  </span>}
                </Box>}
              <Box>
                {event.participants &&
                  <Typography
                    style={{ "font-size": "15px", "color": "#A2A2A2" }} >
                    {event.participants.length + " participants"}
                  </Typography>
                }</Box>
            </Box>

          </Box>
        </CardContent>
        <Divider />
        <Box
          p={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {event.participants.indexOf(user._id) == -1 &&
              <Button variant="contained" color="primary"
                className={classes.button}
                onClick={handleParticipate}
                disabled={!event.openToSubscribe || new Date(event.departure) < new Date()}
              >
                paticipate
          </Button>}
            <Button variant="contained" color="primary"
              className={classes.button}
              onClick={handleOpenDetail}
            >{openDetail ? "Hide Detail" : "show Detail"}
            </Button>


          </Box>
          {openDetail &&
            <Box alignItems="center" display="flex"  >
              {event.description &&
                <>
                  <Typography style={{ "font-size": "15px", "font-weight": "bold" }}> {"Description :   "}</Typography>
                  <Typography style={{ "font-size": "15px" }}> {event.description}</Typography>
                </>
              }
            </Box>}
        </Box>
      </Card>
    </>
  );
};

export default EventCard;
