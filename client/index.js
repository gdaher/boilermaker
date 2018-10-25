import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "../public/index.css";
import Login from "./login";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById("app") // make sure this is the same as the id of the div in your index.html
);
