import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./containers/App";
import { Provider } from "react-redux";
import LangProvider from "./hoc/LangProvider";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <LangProvider>
        <App />
      </LangProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
