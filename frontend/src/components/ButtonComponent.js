import React from "react";
import styled from "styled-components";

const ButtonComponent = ( {buttonText} ) => {
    return (
      <Button>{buttonText}</Button>
    );
};

const Button = styled.button`
  background-color: #61dafb;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #4fa3d1;
  }
`;

export default ButtonComponent;