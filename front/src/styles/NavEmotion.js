import React from "react";
import styled from "@emotion/styled";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 10%;
  position: absolute;
`;

const NavItems = styled.h4`
  cursor: pointer;
`;

export { Nav, NavItems };
