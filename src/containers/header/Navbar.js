import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  width: 100%;
`;
const Navbar = () => {
  return (
    <Nav>
      <Burger />
    </Nav>
  );
};

export default Navbar;
