import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silver Prime — The AI assistant you rename",
  description:
    "Android-native, privacy-first AI assistant. Hybrid on-device + cloud LLM. Rename it anything. Your keys, your data.",
  metadataBase: new URL("https://silverprime.netlify.app"),
  openGraph: {
    title: "Silver Prime",
    description:
      "Android-native, privacy-first AI assistant. Your keys, your data, your name.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} grain antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
