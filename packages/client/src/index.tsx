import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
// components
import App from "./App";
// style
import "./index.css";
import StoreProvider from "./mobx/context/provider";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <StrictMode>
  <StoreProvider>
    <App />
  </StoreProvider>
  // </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
