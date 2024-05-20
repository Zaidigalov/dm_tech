import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./reset.css";
import "./index.css";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
