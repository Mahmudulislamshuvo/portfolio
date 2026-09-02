import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import aboutData from "./data/about.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: `${aboutData.name} | ${aboutData.role}`,
  description: aboutData.bio,
  openGraph: {
    title: `${aboutData.name} | ${aboutData.role}`,
    description: aboutData.bio,
    siteName: aboutData.name,
    images: [
      {
        url: '/my.jpg',
        width: 1200,
        height: 630,
        alt: `${aboutData.name} - ${aboutData.role}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${aboutData.name} | ${aboutData.role}`,
    description: aboutData.bio,
    images: ['/my.jpg'],
  },
  icons: {
    icon: '/my.jpg',
    apple: '/my.jpg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#0b0c10] text-zinc-900 dark:text-zinc-50 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
