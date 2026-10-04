import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export function render(url = "/") {
  return renderToString(
    <React.StrictMode>
      <App initialPath={url} />
    </React.StrictMode>
  );
}
