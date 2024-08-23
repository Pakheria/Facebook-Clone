"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface LoginFormProps {
  error?: string;
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ error, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto grid grid-cols-12 mb-8">
        <div className="col-span-6 flex items-center justify-center">
          <div className="w-full max-w-md text-left">
            <Image
              src="PG_PrimaryLogo.svg"
              width={250}
              height={175}
              alt="Primary-Logo"
              className=""
            />
            <p className="text-gray-600 mt-3 text-2xl ml-1.5 whitespace-wrap">
              Unlock Workforce Potential with <br /> Intelligent Monitoring.
            </p>
          </div>
        </div>
        <div className="col-span-5 flex items-center justify-center">
          <div className="bg-white flex flex-col pt-3 pb-6 px-4 rounded-md w-full max-w-md drop-shadow-2xl">
            <div className="relative mb-4 py-6">
              <input
                className="w-full border-b border-gray-300 py-2 px-1 outline-none"
                type="text"
                placeholder="Email address or phone number"
              />
            </div>
            <div className="relative mb-6">
              <input
                className="w-full border-b border-gray-300 py-2 px-1 outline-none"
                type="password"
                placeholder="Password"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-3.5 rounded-md mt-3 text-lg font-bold hover:bg-blue-700">
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
