import React from 'react';

import { OutlinePerson, OutlineLock, OutlineBusiness } from 'mdi-norm';

import { Stepper } from './index';
import { useStepper } from '@/client/utils';
import { AlignToCenterWithMaxWidth } from '@/client/utils/storybook.decorators';

export default {
  title: 'F3Desk|Layout/Stepper',
  component: Stepper,
  decorators: [AlignToCenterWithMaxWidth],
};

export const Normal = () => {
  const { currentPage, totalPages, togglePage, nextPage } = useStepper(3);

  return (
    <Stepper
      currentPage={currentPage}
      totalPages={totalPages}
      togglePage={togglePage}
      nextPage={nextPage}
      labels={[
        {
          text: 'User',
          icon: OutlinePerson,
        },
        {
          text: 'Password',
          icon: OutlineLock,
        },
        {
          text: 'Enterprise',
          icon: OutlineBusiness,
        },
      ]}
    />
  );
};
