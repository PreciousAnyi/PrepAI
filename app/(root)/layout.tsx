import Image from "next/image";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background flex items-center justify-between px-6 md:px-[100px] py-4 border-[#333]">
        <h4 className="font-sora text-2xl md:text-[32px] font-bold text-white">PrepAI</h4>
        <Image
          src="/profile.png"
          alt="Profile picture"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
      </div>

      {/* Page content */}
      <main className="py-6">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
