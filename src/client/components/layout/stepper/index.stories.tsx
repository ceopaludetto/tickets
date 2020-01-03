import React from 'react';
import { FiUmbrella, FiFeather, FiFastForward } from 'react-icons/fi';

import { useStepper } from '@/client/utils';
import { AlignToCenterWithMaxWidth } from '@/client/utils/storybook.decorators';

import { Stepper } from './index';

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
          text: 'Umbrella Corp.',
          icon: FiUmbrella,
        },
        {
          text: 'Feather Icons',
          icon: FiFeather,
        },
        {
          text: 'Git Merge',
          icon: FiFastForward,
        },
      ]}
    />
  );
};
