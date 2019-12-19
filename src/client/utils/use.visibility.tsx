import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export function useVisibility() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = (toggle?: boolean) => (toggle ? setVisible(toggle) : setVisible(!isVisible));
  const render = () => (isVisible ? <FiEyeOff /> : <FiEye />);

  return { isVisible, render, toggleVisibility };
}
