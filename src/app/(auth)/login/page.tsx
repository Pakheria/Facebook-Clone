"use client"

import React from 'react';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';

const LoginPage: React.FC = () => {
  const handleSubmit = (username: string, password: string) => {
    // Handle form submission, e.g., send data to your Flask backend
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main >
        <LoginForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default LoginPage;
