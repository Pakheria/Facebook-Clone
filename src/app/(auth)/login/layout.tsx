import React from 'react';
import Footer from '@/components/Footer';

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="login-page-bg flex flex-col min-h-screen">
      <div className="flex flex-1 justify-center items-center p-4 content-wrapper">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LoginLayout;
