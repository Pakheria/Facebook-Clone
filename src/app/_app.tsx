import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import '@/app/globals.css'; // Global styles

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('logged_in');
    if (!isAuthenticated && router.pathname !== '/login') {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
