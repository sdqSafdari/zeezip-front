import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ServerClientQueryClientProvider from '@/provider/ServerClientQueryClientProvider';
import {ThemeProvider} from "@/provider/ThemeProvider";
import FooterBackground from "@/app/sitecomponents/FooterBackground";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ZeeZip",
  description: "Share your Files securely. With ZeeZip stay anonymous and free.",
  icons:{
    icon: "/favicon.ico"
  },
  verification: {
    google: "QIt7PX8I0BiYcdfKKM5bXQQKFp98goUT5uvBKvWDWPw"
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <div className='relative z-10 mr-4 ml-4'>
          {children}
          </div>
      </ThemeProvider>
      </body>
    </ServerClientQueryClientProvider>
    <GoogleAnalytics gaId="G-9C3C10GBD7" />
    </html>
  );
}
