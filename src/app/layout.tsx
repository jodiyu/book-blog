import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { BooksProvider } from '@/contexts/BooksContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Blog",
  description: "This is my book blog",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32"}, 
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <BooksProvider>
            <Header/>
            {children}
          </BooksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
