import Image from "next/image";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex items-center justify-between px-[100px] pt-[32px]">
        <h4 className="font-sora text-[32px] font-bold">PrepAI</h4>
        <Image
          src="/profile.png"
          alt="Profile picture"
          width={71}
          height={71}
          className="rounded-full"
        />
      </div>
      <div className="pb-[42px]"></div>
      {children}
    </div>
  );
};

export default RootLayout;
