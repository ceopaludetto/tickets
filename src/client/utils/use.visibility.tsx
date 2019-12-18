import React, { useState } from 'react';
import { Visibility, VisibilityOff } from 'mdi-norm';

export function useVisibility() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = (toggle?: boolean) => (toggle ? setVisible(toggle) : setVisible(!isVisible));
  const render = () => (isVisible ? <VisibilityOff /> : <Visibility />);

  return { isVisible, render, toggleVisibility };
}
