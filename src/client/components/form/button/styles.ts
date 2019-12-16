import styled from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'danger' | 'light' | 'dark';
}

export const Container = styled.button`
  border-radius: 6px;
  border: none;
  text-transform: uppercase;
  background-color: #ffc100;
  font-size: 1rem;
  padding: 0 1rem;
  letter-spacing: 1.3px;
  font-weight: 500;
`;
