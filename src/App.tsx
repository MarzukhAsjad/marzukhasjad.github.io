import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import blog1 from "./content/blog1";
import "./App.css";

function App() {
  return (
    <div className="App w-screen min-h-screen bg-black overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/blog/secure-modularised-microservices-with-webhooks-communication"
          element={blog1()}
        />
      </Routes>
    </div>
  );
}

export default App;
