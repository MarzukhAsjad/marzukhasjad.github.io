import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-gray-600 mb-8">
            I'm currently open for new opportunities. Feel free to reach out!
          </p>
          <a
            href="mailto:your.email@example.com"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
