import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-purple-950 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4">{/* Add your social media links here */}</div>
          <p className="text-gray-400">
            © 2024 Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
