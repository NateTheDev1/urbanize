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
import AddIcon from "@material-ui/icons/Add";
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
  },
});

const DataCard = (props) => {
  const classes = useStyles();

  const onAdd = () => {
    let newSave = {
      word: props.data.word,
      author: props.data.author,
      definition: props.data.definition,
      id: props.data.defid,
      likes: props.data.thumbs_up,
      dislikes: props.data.thumbs_down,
      link: props.data.permalink,
    };
    // TODO NEXT
    // props.addSave(newSave)
  };

  const toSource = () => {
    window.location.href = props.data.permalink;
  };

  return (
    <Card className={classes.container}>
      <CardHeader
        action={
          <IconButton aria-label="share">
            <AddIcon style={{ color: "#00C851" }} />
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

export default DataCard;
