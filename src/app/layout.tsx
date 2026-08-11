import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "TourGuide — Discover Unforgettable Experiences Worldwide",
  description: "Book verified tours and activities with trusted local guides. From food tours to adventures, find and book your perfect experience with instant confirmation.",
  keywords: "tours, travel, experiences, activities, local guides, tour booking, adventure, food tours, cultural tours",
  openGraph: {
    title: "TourGuide — Discover Unforgettable Experiences Worldwide",
    description: "Book verified tours and activities with trusted local guides.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <CurrencyProvider>
            <ThemeProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
