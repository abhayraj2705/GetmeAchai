import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbart from "@/components/Navbart";
import Footer from "@/components/Footer";
import Sessionwrapper from "@/components/Sessionwrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a chai ",
  description: "A website for fund your projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-slate-900 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        <Sessionwrapper>
        <Navbart/>
        <div className="min-h-screen bg-slate-900 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] text-white">

        {children}
        </div>
        <Footer/>
        </Sessionwrapper>
      </body>
    </html>
  );
}
