import './globals.css';
import React from 'react';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ProximaGuard</title>
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
