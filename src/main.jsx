import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./input.css";
import "./output.css";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
