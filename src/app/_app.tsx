// src/pages/_app.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import './globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const lastLoginTime = localStorage.getItem('last_login_time');
    const now = Date.now();
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds

    if (!token || !lastLoginTime || now - Number(lastLoginTime) > sessionTimeout) {
      // Session expired or no token
      localStorage.removeItem('token');
      localStorage.removeItem('last_login_time');
      setIsLoggedIn(false);
      router.push('/login');
    } else {
      setIsLoggedIn(true);
      // Set up inactivity timeout
      const inactivityTimeout = 3 * 60 * 1000; // 3 minutes in milliseconds
      let inactivityTimer: string | number | NodeJS.Timeout | undefined;

      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          // Log out and redirect to login page
          localStorage.removeItem('token');
          localStorage.removeItem('last_login_time');
          setIsLoggedIn(false);
          router.push('/login');
        }, inactivityTimeout);
      };

      // Attach event listeners to reset the timer on user activity
      document.addEventListener('mousemove', resetInactivityTimer);
      document.addEventListener('keydown', resetInactivityTimer);
    }
  }, [router]);

  return <Component {...pageProps} isLoggedIn={isLoggedIn} />;
}

export default MyApp;
