import ChangePasswordForm from "@/presentation/auth/ChangePasswordForm";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordForm />
    </Suspense>
  );
}

export default page;
