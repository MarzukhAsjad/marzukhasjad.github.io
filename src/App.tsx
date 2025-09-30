import Hero from "./components/Hero";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App w-screen min-h-screen bg-black overflow-x-hidden">
      <main className="w-full">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default App;
