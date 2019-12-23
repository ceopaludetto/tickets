import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { IconButton } from '@/client/components/form';

export function useVisibility() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = (toggle?: boolean) => () => (toggle ? setVisible(toggle) : setVisible(!isVisible));

  const render = (is?: any, isNot?: any) => {
    if (is && isNot) {
      return isVisible ? is : isNot;
    }
    return isVisible ? <FiEyeOff /> : <FiEye />;
  };

  const mapVisibilityProps = () => ({
    type: render('text', 'password'),
    append: (
      <IconButton onClick={toggleVisibility()} type="button" aria-label={render('Esconder senha', 'Mostrar senha')}>
        {render()}
      </IconButton>
    ),
  });

  return { isVisible, render, toggleVisibility, mapVisibilityProps };
}
