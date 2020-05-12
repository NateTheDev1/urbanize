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
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  like: {
    color: "red",
  },
  container: {
    textAlign: "center",
    width: "100%",
  },
});

const toSource = (props) => {
  window.location.href = props.data.permalink;
};

const Saved = (props) => {
  const classes = useStyles();

  const handleDelete = () => {
    props.toDelete(props.data.id);
  };

  return (
    <Card className={classes.container}>
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color="secondary" />
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
      <CardActions>
        <Button size="small" onClick={toSource}>
          Source
        </Button>
      </CardActions>
    </Card>
  );
};

export default Saved;
