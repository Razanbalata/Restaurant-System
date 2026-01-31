'use client';

import ResetPasswordPage from '@/features/user/ui/ResetPassowrd';
import React, { Suspense } from 'react';

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage/>
    </Suspense>
  );
}

export default page;
