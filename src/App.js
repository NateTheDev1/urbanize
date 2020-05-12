import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  AppBar,
  Typography,
  InputBase,
  Toolbar,
  Grid,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./App.css";
import DataCard from "./DataCard";

function App() {
  const [term, setTerm] = useState("");
  const [post, setPost] = useState([]);

  const url = `https://api.urbandictionary.com/v0/define?term=${term}`;

  useEffect(() => {
    if (term.length > 1) {
      Axios.get(url)
        .then((response) => {
          // console.log(response.data.list);
          setPost(
            response.data.list.filter((p) => {
              // console.log(p.definition.length);
              return p.definition.length < 75;
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

      {post ? (
        <Grid container spacing={4}>
          {post.map((p) => (
            <Grid item xs={12} sm={6} md={4}>
              <DataCard data={p} term={term} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>Search Something</p>
      )}
    </div>
  );
}

export default App;
