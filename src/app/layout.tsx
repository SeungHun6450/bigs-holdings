import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bigs Holdings Assignment",
  description: "Big Holding Test Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
