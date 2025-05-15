import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../components/ReduxProvider";
import ClientWrapper from "../components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexLearn - Online Learning & Assessment Platform",
  description: "NexLearn is a comprehensive online learning platform offering interactive tests, assessments, and educational content. Perfect for students, professionals, and lifelong learners.",
  keywords: "online learning, assessment platform, educational tests, MCQ tests, online education, learning platform",
  authors: [{ name: "NexLearn Team" }],
  creator: "NexLearn",
  publisher: "NexLearn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nexlearn.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexlearn.com',
    title: 'NexLearn - Online Learning & Assessment Platform',
    description: 'NexLearn is a comprehensive online learning platform offering interactive tests, assessments, and educational content.',
    siteName: 'NexLearn',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NexLearn Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexLearn - Online Learning & Assessment Platform',
    description: 'NexLearn is a comprehensive online learning platform offering interactive tests, assessments, and educational content.',
    images: ['/twitter-image.png'],
    creator: '@nexlearn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://nexlearn.com" />
        <meta name="theme-color" content="#1C3141" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
