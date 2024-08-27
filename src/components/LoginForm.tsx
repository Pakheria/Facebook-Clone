"use client";

import React, { useState } from 'react';

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
    <div className="flex flex-row items-center justify-between w-full max-w-6xl p-8 space-x-8">
      <div className="flex-1 flex flex-col items-center">
        <div className="bg-white flex flex-col pt-3 pb-6 px-4 rounded-md w-full max-w-md drop-shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4 py-6">
              <input
                className="w-full border-b border-gray-300 py-2 px-1 outline-none"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative mb-6">
              <input
                className="w-full border-b border-gray-300 py-2 px-1 outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3.5 rounded-md mt-3 text-lg font-bold hover:bg-blue-700"
            >
              Log in
            </button>
          </form>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
