import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServerClientQueryClientProvider from '@/provider/ServerClientQueryClientProvider';
import {ThemeProvider} from "@/provider/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZeeZip",
  description: "share your files easily",
  icons:{
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <ServerClientQueryClientProvider>
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
        {children}
      </ThemeProvider>
      </body>
    </ServerClientQueryClientProvider>
    </html>
  );
}
