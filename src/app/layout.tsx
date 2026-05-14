import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import { AppProviders } from "@/providers/AppProviders";
=======
import AuthProvider from "@/provider/AuthProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
>>>>>>> 833ed2d8fdd2f74609cc0434e0684db007c394e4

export const metadata: Metadata = {
  title: "Books and Shack",
  description: "Discover millions of books from trusted local bookstores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" className={cn("h-full antialiased", "font-sans")}>
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
=======
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        {" "}
        <AuthProvider>{children}</AuthProvider>
>>>>>>> 833ed2d8fdd2f74609cc0434e0684db007c394e4
      </body>
    </html>
  );
}
