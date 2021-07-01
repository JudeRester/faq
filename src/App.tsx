import { Paper } from "@material-ui/core";
import React from "react";
import Header from "./components/commons/Header";
import { BrowserRouter, Route } from "react-router-dom";
import List from "./components/list";
import WriteArticle from "./components/writeArticle";

function App() {
  return (
    <>
      <Header />
      <Paper
        style={{ margin: "5px", padding: "10px", backgroundColor: "#e3e3e3" }}
      >
        <BrowserRouter>
          <Route exact path="/" component={List} />
          <Route path="/write" component={WriteArticle} />
        </BrowserRouter>
      </Paper>
    </>
  );
}

export default App;
