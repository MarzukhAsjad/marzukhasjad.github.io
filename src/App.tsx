import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import blog1 from "./posts/blog1";
import blog2 from "./posts/blog2";
import blog3 from "./posts/blog3";
import "./App.css";

function App() {
  return (
    <div className="App w-screen min-h-screen bg-black overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/blog/secure-modularised-microservices-with-webhooks-communication"
          element={blog1()}
        />
        <Route
          path="/blog/b2c-success-hinges-on-customer-convenience"
          element={blog2()}
        />
        <Route
          path="/blog/monitoring-your-distributed-microservices"
          element={blog3()}
        />
      </Routes>
    </div>
  );
}

export default App;
