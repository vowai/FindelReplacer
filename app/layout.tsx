import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
const meisterRegular = localFont({
  src: "./fonts/meisterr.woff",
  variable: "--font-meisterr",
  weight: "100 900",
});
const meisterBold = localFont({
  src: "./fonts/meisterb.woff",
  variable: "--font-meisterb",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "9556 NoE",
  description: "9556 NoE",
  icons: {icon:"/JM_icon.png"},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${meisterRegular.variable} ${meisterBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
