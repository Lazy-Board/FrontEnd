import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import NewsMainView from "./components/NewsMainView";

function App() {
  const [count, setCount] = useState(0);

  return <NewsMainView />;
}

export default App;
