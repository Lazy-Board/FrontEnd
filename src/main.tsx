import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import App from "./App";
import "./index.css";
import { RecoilRoot } from "recoil";

import "./index.css";

=======
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";

>>>>>>> d4de9c1d187ea23f7d91c3972a7a8a98b0d210f4
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
