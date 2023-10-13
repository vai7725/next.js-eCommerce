import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce",
  description: "Our practice of Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="m-auto min-w-[300px] max-w-7xl p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
