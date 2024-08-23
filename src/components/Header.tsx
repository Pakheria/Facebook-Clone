"use client";

import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="py-2 bg-primary-darker-blue">
      <div className="container mx-auto grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-center">
          <Image
            src="PL_PrimaryPureWhite.svg"
            alt="logo-white"
            width={200}
            height={150}
            className="h-12"
          />
        </div>
        <div className="col-span-2"></div>
      </div>
    </header>
  );
};

export default Header;
