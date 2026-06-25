import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fatih Emre Barutçu | Full Stack Developer",
  description:
    "İzmir merkezli Full Stack Developer portfolyosu. Next.js, React ve Flutter ile web uygulamaları.",
  openGraph: {
    title: "Fatih Emre Barutçu | Full Stack Developer",
    description:
      "İzmir merkezli Full Stack Developer. E-ticaret, AI araçları ve kurumsal web projeleri.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
