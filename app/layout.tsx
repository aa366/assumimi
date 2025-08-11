import type { Metadata } from "next";
import { Mona_Sans} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSana = Mona_Sans({
  variable: "--font-Mona_Sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "assummi",
  description: "An AI-powered olatform for preparing for mock interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html lang="en" className="dark" >
      <body
        className={`${monaSana.className} pattern antialiased  `}
      >
        {children}  
        <Toaster />
      </body>
    </html>
  );
}
