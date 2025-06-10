import React from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen text-white flex items-center px-10 justify-center text-left bg-black">
      <Terminal className="max-w-2xl h-full p-8 rounded-lg shadow-lg">
        <TypingAnimation delay={0} className="text-gray-800">
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

        <TypingAnimation delay={2500} className="text-gray-800">
          {"> skills --primary"}
        </TypingAnimation>
        <AnimatedSpan
          delay={4000}
          className="text-green-400 whitespace-pre-line"
        >
          {
            "Java, Spring Boot, Python, React, TypeScript, Docker, AWS, Team Leadership, AI Integration, Full-Stack Development"
          }
        </AnimatedSpan>

        <TypingAnimation delay={5500} className="text-gray-800">
          {"> experience --current"}
        </TypingAnimation>
        <AnimatedSpan
          delay={7000}
          className="text-green-400 whitespace-pre-line"
        >
          {
            "Leading fintech innovation at Rabbit Credit Limited\nCo-founding AI edtech startup Examify Limited"
          }
        </AnimatedSpan>

        <TypingAnimation delay={8500} className="text-gray-800">
          {"> projects --featured"}
        </TypingAnimation>
        <AnimatedSpan
          delay={10000}
          className="text-green-400 whitespace-pre-line"
        >
          {
            "AniGEN: Open-source text-to-animation tool\nExamify: AI-powered HKDSE learning platform\nFinTech Systems: MCRA-integrated loan management"
          }
        </AnimatedSpan>

        <TypingAnimation delay={11500} className="text-gray-800">
          {"> achievements --recent"}
        </TypingAnimation>
        <AnimatedSpan
          delay={13000}
          className="text-green-400 whitespace-pre-line"
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
