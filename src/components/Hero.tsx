import React from "react";
import { gsap } from "gsap";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen w-full text-white flex items-center px-10 justify-center text-left bg-black">
      <Terminal>
        <TypingAnimation delay={0} className="text-gray-300">
          {"> whoami"}
        </TypingAnimation>
        <AnimatedSpan
          delay={1500}
          className="text-green-400 whitespace-pre-line"
        >
          {
            "Marzukh Asjad - Software Engineer & Co-founder\nCS Graduate from University of Hong Kong\nCurrently leading fintech innovation at Rabbit Credit Limited"
          }
        </AnimatedSpan>

        <TypingAnimation delay={2500} className="text-gray-300">
          {"> skills --primary"}
        </TypingAnimation>
        <AnimatedSpan
          delay={4000}
          className="text-green-400 whitespace-pre-line"
        >
          {
            "Java, Spring Boot, Python, React, TypeScript, Docker, AWS\nTeam Leadership, AI Integration, Full-Stack Development"
          }
        </AnimatedSpan>
      </Terminal>

      {/* Tech Stack Orbiting Circles */}
      <div className="mt-12 flex justify-center">
        {/* OrbitingCircles component will go here */}
      </div>
    </section>
  );
};

export default Hero;
