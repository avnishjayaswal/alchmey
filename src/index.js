import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./Components/Services/Store";
import { Provider } from "react-redux";
import  AlchmeyMatrix  from "./Components/Matrix/AlchmeyMatrix";
import HeaderInfo from "./Components/MatrixHeader/HeaderInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <HeaderInfo />
      <AlchmeyMatrix />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
