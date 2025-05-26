import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import FeaturedProjects from "./components/FeaturedProjects";
import OtherProjects from "./components/OtherProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App w-screen min-h-screen bg-black overflow-x-hidden">
      <main className="w-full">
        <Hero />
        <div className="max-w-7xl mx-auto px-4">
          <TechStack />
          <FeaturedProjects />
          <OtherProjects />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
