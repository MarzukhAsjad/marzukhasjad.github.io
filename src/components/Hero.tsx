import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm [Your Name]</h1>
        <p className="text-xl mb-6">Full Stack Developer</p>
        <p className="text-gray-600 max-w-2xl">
          A passionate developer focused on creating interactive and responsive web applications.
        </p>
      </div>
    </section>
  );
};

export default Hero;
