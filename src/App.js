import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  AppBar,
  Typography,
  InputBase,
  Toolbar,
  Grid,
  Button,
  Snackbar,
  IconButton,
  Alert,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./App.css";
import DataCard from "./DataCard";
import useLocalStorage from "./hooks/useLocalStorage";
import Saved from "./Saved";
import CasinoIcon from "@material-ui/icons/Casino";

function App() {
  const [term, setTerm] = useState("");
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);

  const [saved, setSaves] = useLocalStorage("saved", []);

  const url = `https://api.urbandictionary.com/v0/define?term=${term}`;
  const randURL = `https://api.urbandictionary.com/v0/random`;

  useEffect(() => {
    if (term.length > 1) {
      Axios.get(url)
        .then((response) => {
          console.log(response.data.list);
          setPost(
            response.data.list.filter((p) => {
              // console.log(p.definition.length);
              return p.definition.length < 150;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPost("");
    }
  }, [term]);

  const updateTerm = (e) => {
    setTerm(e.target.value);
  };

  const clearSearch = (e) => {
    setTerm("");
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addSave = (newSave) => {
    let oldSaves = JSON.parse(localStorage.getItem("saved"));
    oldSaves.push(newSave);
    setSaves(oldSaves);
  };

  const toDelete = (id) => {
    let oldSaves = JSON.parse(localStorage.getItem("saved"));
    const newOld = oldSaves.filter((s) => {
      return s.id !== id;
    });
    setSaves(newOld);
  };

  const handleRandom = () => {
    Axios.get(randURL)
      .then((response) => {
        setTerm(response.data.list[0].word);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <AppBar position="static" className="app-bar">
        <Toolbar className="tool-bar">
          <Typography variant="h6" noWrap className="title">
            U R B A N I Z E
          </Typography>
          <div className="search">
            <SearchIcon className="search-icon" />
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              className="input-search"
              value={term}
              onChange={updateTerm}
            />
          </div>
        </Toolbar>
      </AppBar>
      {saved.length > 0 ? (
        <ExpansionPanel style={{ marginTop: "2%" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Saved Definitions</Typography>
          </ExpansionPanelSummary>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowX: "scroll",
            }}
          >
            {saved.map((s) => (
              <ExpansionPanelDetails>
                <Saved data={s} term={term} toDelete={toDelete} />
              </ExpansionPanelDetails>
            ))}
          </div>
        </ExpansionPanel>
      ) : (
        <p>Your Saved Definitions Will Appear Here</p>
      )}
      {/* <Button
        size="medium"
        color="primary"
        variant="outlined"
        className="clear"
      >
        View Saved
      </Button> */}
      <Button
        size="large"
        color="primary"
        variant="outlined"
        className="clear"
        startIcon={<CasinoIcon />}
        onClick={handleRandom}
        cy-data="random"
      >
        Random Word
      </Button>
      <Button
        size="medium"
        color="secondary"
        variant="outlined"
        className="clear"
        onClick={clearSearch}
      >
        Clear Search
      </Button>
      {post ? (
        <Grid container spacing={4}>
          {post.map((p) => (
            <Grid item xs={12} sm={6} md={4}>
              <DataCard data={p} term={term} addSave={addSave} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>Search For Anything</p>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Cleared Search"
        severity="info"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              Ok
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default App;
