import React from "react";
import styled from "styled-components";

const ButtonStyledComponent = styled.button`
  height: 2rem;
  margin-top: 1.5rem;
  background: ${(props) => props.theme.colors.green300};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 2px;
  font-size: 1rem;

  cursor: pointer;
`;

interface ButtonPropsInterface {
  children: React.ReactNode;
  typeButton: "button" | "submit" | "reset" | undefined;
}

function ButtonComponent({ children, typeButton }: ButtonPropsInterface) {
  return (
    <ButtonStyledComponent type={typeButton}>{children}</ButtonStyledComponent>
  );
}

export default ButtonComponent;
