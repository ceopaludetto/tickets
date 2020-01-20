import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from 'styled-tools';

export const Container = styled(motion.div)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1100;
  pointer-events: none;
  transition: opacity 150ms ease-in-out, width 150ms ease-in-out;
`;

export const Bar = styled.div`
  background-color: ${theme('colors.secondary.main')};
  height: 2px;
  width: 100%;
`;

export const Peg = styled.div`
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${theme('colors.secondary.main')}, 0 0 5px ${theme('colors.secondary.main')};
  opacity: 1;
  transform: rotate(3deg) translate(0px, -4px);
`;
