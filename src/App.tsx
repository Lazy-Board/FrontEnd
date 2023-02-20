import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import NewsMainView from "./components/NewsMainView";
import NewsDetailView from "./components/News/NewsDetailView";

function App() {
  const [count, setCount] = useState(0);

  return <NewsDetailView />;
}

export default App;
