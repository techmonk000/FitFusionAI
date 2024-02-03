import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-6 py-4 mx-auto flex items-center justify-between">

        <div className="flex items-center space-x-4">
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl" />
          </a>
        </div>

        <div>
          <p className="text-sm">
            © {new Date().getFullYear()} FitFusionAI
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
