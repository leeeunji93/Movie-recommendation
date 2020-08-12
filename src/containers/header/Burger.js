import React, { useState } from 'react';
import styled from 'styled-components';
import LeftNav from './LeftNav';

const StyledBurger = styled.div`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  display: none;
  z-index: 20;
  @media (max-width: 767px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  .Line {
    width: 2rem;
    height: 0.2rem;
    background-color: ${({ open }) => (open ? '#fff' : '#000')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? '0' : '1')};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;
const Burger = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div className="Line" />
        <div className="Line" />
        <div className="Line" />
      </StyledBurger>
      <LeftNav open={open} />
    </>
  );
};

export default Burger;
