import React, { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm type="sign-up" />
    </Suspense>
  );
};

export default Page;
