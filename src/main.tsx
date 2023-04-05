import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
=======
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
>>>>>>> ede9d980749506e433fa4e99e757901c588ed040
    </RecoilRoot>
  </React.StrictMode>
);
