"use client";

import React from 'react';
import LoginForm from '@/components/LoginForm';
import Footer from '@/components/Footer';

const LoginPage: React.FC = () => {
  const handleSubmit = (username: string, password: string) => {
    // Handle form submission, e.g., send data to your Flask backend
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
      <main className="flex flex-1 items-center justify-center">
        <LoginForm onSubmit={handleSubmit} />
      </main>
  );
};

export default LoginPage;
