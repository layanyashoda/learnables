import { ReactNode } from "react";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { Geist, Geist_Mono } from "next/font/google";
import DialogflowChatbot from "@/components/DialogflowChatbot";

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learnables",
  description: "Study Material Marketplace",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        >
          {children}

          <Toaster />
          <DialogflowChatbot />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
