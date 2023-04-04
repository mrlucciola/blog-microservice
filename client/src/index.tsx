import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// components
import App from "./App";
// style
import "./index.css";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const isStrict = false;

root.render(
  isStrict ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
