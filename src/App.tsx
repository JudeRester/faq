import React from "react";
import Header from "./components/commons/Header";
import { BrowserRouter, Route } from "react-router-dom";
import List from "./components/list";
import WriteArticle from "./components/writeArticle";

function App() {
  return (
    <>
      <Header />
      
        <BrowserRouter>
          <Route exact path="/" component={List} />
          <Route path="/write" component={WriteArticle} />
        </BrowserRouter>
    </>
  );
}

export default App;
