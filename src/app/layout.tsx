import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GSAPProvider } from "@/lib/animations/gsap-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Romeran Rodriguez | Senior FullStack Developer",
  description: "Senior FullStack Developer with 6+ years building scalable web apps with React, Next.js, TypeScript, Nest.js & Laravel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GSAPProvider>{children}</GSAPProvider>
      </body>
    </html>
  );
}
