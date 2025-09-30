import React, { useState, useEffect } from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

// Page 1: Personal info, skills, experience
const TerminalPage1: React.FC = () => (
  <>
    <div className="flex items-baseline">
      <AnimatedSpan delay={0} className="text-green-500">
        mizookie@localhost:~${" "}
      </AnimatedSpan>
      <TypingAnimation duration={30} className="text-yellow-200 inline-block">
        whoami
      </TypingAnimation>
    </div>
    <AnimatedSpan delay={1500} className="text-gray-200 whitespace-pre-line">
      {
        "Marzukh Akib Asjad - Software Engineer & Co-founder\nBEng (CS) graduate, University of Hong Kong, 2024"
      }
    </AnimatedSpan>

    <div className="flex items-baseline">
      <AnimatedSpan delay={1700} className="text-green-500">
        mizookie@localhost:~${" "}
      </AnimatedSpan>
      <TypingAnimation
        delay={2500}
        duration={25}
        className="text-yellow-200 inline-block"
      >
        {"skills --primary"}
      </TypingAnimation>
    </div>
    <AnimatedSpan delay={4000} className="text-gray-200 whitespace-pre-line">
      {
        "Java, Spring Boot, Python, React, TypeScript, Docker, AWS, Next.js, FastAPI, GitHub Actions, MERN, C, AI Integration, CICD, Team Leadership, Full-Stack & Backend Development"
      }
    </AnimatedSpan>

    <div className="flex items-baseline">
      <AnimatedSpan delay={4200} className="text-green-500">
        mizookie@localhost:~${" "}
      </AnimatedSpan>
      <TypingAnimation delay={5500} duration={25} className="text-yellow-200">
        {"experience --current"}
      </TypingAnimation>
    </div>
    <AnimatedSpan delay={7000} className="text-gray-200 whitespace-pre-line">
      {
        "Team Lead, Software Engineering at Rabbit Credit Limited (Fintech - MCRA Credit Data Smart)\nCo-founder & System Engineer at Examify Limited (AI-powered EdTech, HKSTP ideation & funding)"
      }
    </AnimatedSpan>

    <div className="flex items-baseline">
      <AnimatedSpan delay={7200} className="text-green-500">
        mizookie@localhost:~${" "}
      </AnimatedSpan>
      <TypingAnimation delay={8500} duration={25} className="text-yellow-200">
        {"clear"}
      </TypingAnimation>
    </div>
  </>
);

// Page 2: Projects and achievements
const TerminalPage2: React.FC = () => (
  <>
    <div className="flex items-baseline">
      <AnimatedSpan className="text-green-500">
        mizookie@localhost:~${" "}
      </AnimatedSpan>
      <TypingAnimation delay={500} duration={25} className="text-yellow-200">
        {"projects --featured"}
      </TypingAnimation>
    </div>
    <AnimatedSpan delay={2000} className="text-gray-200 whitespace-pre-line">
      {
        "AniGEN: Open-source text-to-animation generator (Blender, Python, N8N workflows)\nPackage Mapper: Repository dependency visualizer\nWhatsApp AI Chatbot: Real-time subscription payments and learning analytics (Python, FastAPI, Airwallex API)\nFinTech Systems: MCRA-integrated loan management platform (Java, Spring, MERN)"
      }
    </AnimatedSpan>

    <div className="flex items-baseline">
      <AnimatedSpan delay={2200} className="text-green-500">
        mizookie@localhost:~${" "}
      </AnimatedSpan>
      <TypingAnimation delay={3500} duration={25} className="text-yellow-200">
        {"achievements --recent"}
      </TypingAnimation>
    </div>
    <AnimatedSpan delay={5000} className="text-gray-200 whitespace-pre-line">
      {
        "40% faster development cycles (CICD & agile)\n1000+ monthly data transactions processed\nDeployed scalable production systems (Docker, AWS, Nginx)\nLed cross-functional teams (3-4 developers) to delivery"
      }
    </AnimatedSpan>

    <div className="flex items-baseline">
      <AnimatedSpan delay={5200} className="text-green-500">
        mizookie@localhost:~${" "}
      </AnimatedSpan>
      <TypingAnimation delay={6500} duration={25} className="text-yellow-200">
        {"clear"}
      </TypingAnimation>
    </div>
  </>
);

const Hero: React.FC = () => {
  const [loopKey, setLoopKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageInterval = 10000; // 10 seconds per page

    const pageTimer = setInterval(() => {
      setCurrentPage((prev) => (prev === 1 ? 2 : 1)); // Toggle between page 1 and 2
      setLoopKey((prev) => prev + 1); // Force remount for new animations
    }, pageInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(pageTimer);
  }, []);

  return (
    <section className="min-h-screen text-white flex flex-col items-center px-10 justify-center text-left bg-purple-950">
      <div
        className="mb-4 cursor-pointer hover:text-blue-300 transition-colors duration-200"
        onClick={() => (window.location.href = "/blog")}
      >
        <TypingAnimation
          delay={2700}
          duration={30}
          className="text-yellow-400 mt-4 text-lg font-mono"
        >
          {"Skip to Blog >"}
        </TypingAnimation>
      </div>
      <Terminal
        key={loopKey}
        className="max-w-2xl min-h-[500px] h-auto p-8 rounded-lg shadow-lg bg-amber-950"
      >
        {currentPage === 1 ? <TerminalPage1 /> : <TerminalPage2 />}
      </Terminal>
    </section>
  );
};

export default Hero;
