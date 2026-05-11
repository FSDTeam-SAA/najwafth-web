import type { ReactNode } from "react";

import { Footer } from "@/presentation/layout/Footer";
import { Navbar } from "@/presentation/layout/Navbar";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
