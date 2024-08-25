'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="py-1.5 bg-primary-darker-blue text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="PG_PureWhite.svg"
            alt="logo-white"
            width={150}
            height={100}
            className="h-12"
          />
        </div>
        <div className="text-center flex-1">
          ProximaLink Monitoring &copy; 2024
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://www.facebook.com/proximalink" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaFacebook size={28} />
          </Link>
          <Link href="https://www.github.com/proximalink" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaGithub size={28} />
          </Link>
          <Link href="https://www.linkedin.com/in/proximalink" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaLinkedin size={28} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
