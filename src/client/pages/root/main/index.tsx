import React from 'react';

import u from '@/client/scss/utils.scss';
import { Calendar } from '@/client/components';

export default function RootMain() {
  return (
    <div className={u['xs:ai-center']}>
      mainroot
      <Calendar />
      <Calendar enableBefore={false} />
    </div>
  );
}
