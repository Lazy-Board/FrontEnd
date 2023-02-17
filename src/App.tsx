import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import TodoList from "./pages/TodoList";
import TodoMainView from "./components/TodoMainView";

function App() {
  const [count, setCount] = useState(0);

  return <TodoMainView />;
}

export default App;
