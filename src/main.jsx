import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ItemProvider } from "./context/ItemContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ItemProvider>
        <App />
      </ItemProvider>
    </BrowserRouter>
  </React.StrictMode>
);

