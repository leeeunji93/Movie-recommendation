import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 1.8rem 1rem;
    color: black;
    line-height: 1.5;
    letter-spacing: 0.3rem;
  }

  @media (max-width: 767px) {
    display: flex;
    flex-flow: column nowrap;
    background-color: #04bfad;
    position: fixed;
    top: 0;
    right: 0;
    border-right: 0;
    height: 100vh;
    width: 15rem;
    padding-top: 3.5rem;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    li {
      color: white;
    }
  }
`;
const LeftNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li>Login</li>
      <li>MyPage</li>
      <li>Write</li>
    </Ul>
  );
};

export default LeftNav;
