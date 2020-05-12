import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  CardMedia,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  like: {
    marginTop: 3,
    color: "red",
  },
  container: {
    textAlign: "center",
  },
});

const DataCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <CardHeader
        action={
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        }
        title={props.data.word}
        subheader={props.data.author}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {props.data.definition}
        </Typography>
        <Typography variant="body3" component="p" className={classes.like}>
          Likes: {props.data.thumbs_up} Dislikes: {props.data.thumbs_down}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DataCard;
