import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query-provider";

const overOverpass = Overpass({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Query with Search Params",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${overOverpass.className} bg-neutral-900 text-neutral-100`}
      >
        <ReactQueryProvider>
          <main className="max-w-6xl mx-auto py-20 px-16 min-h-[100svh] lg:min-h-[110svh]">
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
