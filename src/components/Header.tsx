// src/components/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("token");
    const lastLoginTime = localStorage.getItem("last_login_time");

    if (token && lastLoginTime) {
      const now = Date.now();
      const sessionTimeout = 1 * 10 * 1000; // 30 minutes

      if (now - Number(lastLoginTime) > sessionTimeout) {
        // Session expired
        localStorage.removeItem("token");
        localStorage.removeItem("last_login_time");
        setIsLoggedIn(false);
        router.push("/login");
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("last_login_time");
    setIsLoggedIn(false);
    router.push("/login");
  };

  // Hide header on the login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="py-1.5 bg-primary-darker-blue text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/PL_PrimaryPureWhite.svg" // Ensure this path is correct
            alt="logo-white"
            width={150}
            height={100}
            className="h-auto w-32"
            priority
          />
        </div>
        {isLoggedIn &&  (
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-lg hover:bg-red-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
