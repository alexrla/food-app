import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./context/OrderInfo";

const root = document.getElementById("root");
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>, 
  root
);
