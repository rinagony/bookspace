import React from "react";
import styled from "styled-components";

const ButtonStyledComponent = styled.button`
  height: 2rem;
  background: ${(props) => props.theme.colors.green300};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 2px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface ButtonPropsInterface {
  children: React.ReactNode;
  typeButton: "button" | "submit" | "reset" | undefined;
  styles?: React.CSSProperties;
  onClick?: () => void;
}

function ButtonComponent({ children, typeButton, styles, onClick }: ButtonPropsInterface) {
  return (
    <ButtonStyledComponent onClick={onClick} style={styles} type={typeButton}>{children}</ButtonStyledComponent>
  );
}

export default ButtonComponent;
