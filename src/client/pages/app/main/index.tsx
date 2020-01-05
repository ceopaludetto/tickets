import React from 'react';

import { Header, Sidebar } from '@/client/components';
import { AppRoutes } from '@/client/routes/app';

export default function AppMain() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <AppRoutes />
      </main>
    </>
  );
}
