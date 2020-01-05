import React, { useState } from 'react';
import { useToggle } from 'react-use';

import { generate } from 'shortid';

import { Progress, ProgressContext } from './index';
import { Button } from '@/client/components/form';
import { AlignToCenter } from '@/client/utils/storybook.decorators';

export default {
  title: 'F3Desk|Layout/Progress',
  component: Progress,
};

export const Normal = () => {
  const [key, setKey] = useState(generate());
  const [isAnimating, toggleAnimation] = useToggle(false);

  function handleChangekey() {
    if (!isAnimating) {
      setKey(generate());
    }
  }

  return (
    <>
      <ProgressContext.Provider value={{ isAnimating, toggleAnimation }}>
        <Progress onTransitionEnd={handleChangekey} key={key} />
      </ProgressContext.Provider>
      {AlignToCenter(() => (
        <Button onClick={toggleAnimation}>{isAnimating ? 'Stop Progress' : 'Start Progress'}</Button>
      ))}
    </>
  );
};
