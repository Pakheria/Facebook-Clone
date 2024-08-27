"use client";

import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleSubmit = async (username: any, password: any) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem('logged_in', 'true'); // Save session on successful login
        window.location.href = result.redirectUrl;  // Redirect to Flask's index page
      } else {
        setError(result.message);  // Display error message from the API
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center">
      <LoginForm onSubmit={handleSubmit} error={error} />
    </main>
  );
};

export default LoginPage;
