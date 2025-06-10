import React from 'react';
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Java, Spring, FastAPI, Python, Git, Docker, PostgreSQL } from "developer-icons";

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="min-h-screen w-full text-white flex items-center px-10 justify-center text-left bg-black" style={{ position: "relative" }}>
      <div className="container mx-auto px-4 z-1">
        <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
      </div>
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 blur-xs">
        <OrbitingCircles iconSize={200} path={false} radius={300} speed={1}>
          <Java />
          <Spring />
          <FastAPI />
          <Python />
        </OrbitingCircles>
        <OrbitingCircles iconSize={100} path={false} radius={130} reverse speed={2}>
          <Git />
          <Docker />
          <PostgreSQL />
        </OrbitingCircles>
      </div>
    </section >
  );
};

export default TechStack;
