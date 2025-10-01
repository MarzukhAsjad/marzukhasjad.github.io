import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <main className="w-full">
        <Hero />
      </main>
      <Footer />
    </>
  );
};

export default Home;
