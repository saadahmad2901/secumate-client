"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        Cookies.remove("token");
        console.log("Token removed because tab is inactive");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            padding: "12px 20px",
            borderRadius: "8px",
            background: "#edecffd4",
            border: "1px solid #315e7f",
            color: "#1803ff",
            zIndex: 9999,
          },
        }}
      />
    </div>
  );
}
