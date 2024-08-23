'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="py-3 bg-primary-darker-blue text-white bottom-0 left-0 right-0">
      <div className="container mx-auto grid grid-cols-12">
        <div className="col-span-2 flex items-center">
          <Image
            src="/PureWhite.svg"
            alt="logo-white"
            width={150}
            height={100}
            className="h-12"
          />
        </div>
        <div className="col-span-8 flex justify-center items-center space-x-4">
          <div className="text-center">ProximaLink Monitoring &copy; 2024</div>
          </div>
          <div className="flex items-center">
            <Link href="https://www.facebook.com/proximalink" target="_blank" rel="noopener noreferrer" className="mr-2 text-white">
              <FaFacebook size={28} />
            </Link>
            <Link href="https://www.github.com/proximalink" target="_blank" rel="noopener noreferrer" className="mr-2 text-white">
              <FaGithub size={28} />
            </Link>
            <Link href="https://www.linkedin.com/in/proximalink" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaLinkedin size={28} />
            </Link>
          </div>
        <div className="col-span-2"></div>
      </div>
    </footer>
  );
};

export default Footer;
