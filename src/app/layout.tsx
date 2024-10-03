import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServerClientQueryClientProvider from '@/provider/ServerClientQueryClientProvider';

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
      <body className={inter.className}>{children}</body>
    </ServerClientQueryClientProvider>
    </html>
  );
}
