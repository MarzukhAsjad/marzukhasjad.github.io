import React from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

const Hero: React.FC = () => {
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
      <Terminal className="max-w-2xl min-h-[500px] h-auto p-8 rounded-lg shadow-lg bg-amber-950">
        <TypingAnimation duration={30} className="text-green-400">
          {"mizookie@localhost:~$ whoami"}
        </TypingAnimation>
        <AnimatedSpan
          delay={1500}
          className="text-gray-200 whitespace-pre-line"
        >
          {
            "Marzukh Akib Asjad - Software Project Lead & Co-founder\nComputer Science graduate from HKU in 2024"
          }
        </AnimatedSpan>

        <TypingAnimation delay={2500} duration={25} className="text-green-400">
          {"mizookie@localhost:~$ skills --primary"}
        </TypingAnimation>
        <AnimatedSpan
          delay={4000}
          className="text-gray-200 whitespace-pre-line"
        >
          {
            "Java, Spring Boot, Python, React, TypeScript, Docker, AWS, Team Leadership, AI Integration, Full-Stack Development"
          }
        </AnimatedSpan>

        <TypingAnimation delay={5500} duration={25} className="text-green-400">
          {"mizookie@localhost:~$ experience --current"}
        </TypingAnimation>
        <AnimatedSpan
          delay={7000}
          className="text-gray-200 whitespace-pre-line"
        >
          {
            "Leading fintech innovation at Rabbit Credit Limited\nCo-founding AI edtech startup Examify Limited"
          }
        </AnimatedSpan>

        <TypingAnimation delay={8500} duration={25} className="text-green-400">
          {"mizookie@localhost:~$ projects --featured"}
        </TypingAnimation>
        <AnimatedSpan
          delay={10000}
          className="text-gray-200 whitespace-pre-line"
        >
          {
            "AniGEN: Open-source text-to-animation tool\nPackage Mapper: Open-source repository dependency visualization tool\nFinTech Systems: MCRA-integrated loan management"
          }
        </AnimatedSpan>

        <TypingAnimation delay={11500} duration={25} className="text-green-400">
          {"mizookie@localhost:~$ achievements --recent"}
        </TypingAnimation>
        <AnimatedSpan
          delay={13000}
          className="text-gray-200 whitespace-pre-line"
        >
          {
            "40% improvement in development speed\n1000+ monthly data transactions handled\nTeam leadership of 4 developers"
          }
        </AnimatedSpan>
      </Terminal>
    </section>
  );
};

export default Hero;
