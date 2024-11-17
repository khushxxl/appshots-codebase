import type { Metadata } from "next";
import "../globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { AppSidebar } from "@/components/sidebar";
import { GradientProvider } from "@/contexts/GradientContext";
import { SidebarProvider } from "@/components/ui/sidebar";

const poppins = Poppins({
  weight: ["300"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const poppins_extrabold = Poppins({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-poppins-extrabold",
});

const poppins_bold = Poppins({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-poppins-bold",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${poppins_extrabold.variable} ${poppins_bold.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GradientProvider>
            <div className="flex flex-col  w-full h-screen pt-[40px]">
              <Navbar />

              <main className="flex">
                <AppSidebar />
                {children}
              </main>
            </div>
          </GradientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
