import React from 'react';

import { Calendar } from '@/client/components';
import u from '@/client/scss/utils.scss';

export default function RootMain() {
  return (
    <div className={u['xs:ai-center']}>
      mainroot
      <Calendar />
      <Calendar disablePast />
      <Calendar disableFuture />
    </div>
  );
}
