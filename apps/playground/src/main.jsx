import { ListProvider } from "@7span/react-list";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import requestHandler from "./api/request-handler.js";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ListProvider config={{ requestHandler }}>
      <App />
    </ListProvider>
  </StrictMode>
);
