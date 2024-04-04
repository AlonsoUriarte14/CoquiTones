import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { FaBars } from 'react-icons/fa';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll';
import { scroller as NavScroll } from 'react-scroll';

const Nav = styled('nav')(({ theme }) => ({
  background: '#191716',
  height: 80,
  marginTop: -80,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1rem',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  [theme.breakpoints.down('sm')]: {
    transition: '0.8s all ease',
  },
}));

const NavbarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  height: 80,
  zIndex: 1,
  width: '100%',
  padding: '0 24px',
  maxWidth: 2000,
});

const NavLogo = styled(LinkRouter)({
  color: '#ffc857',
  justifySelf: 'flex-start',
  cursor: 'pointer',
  fontSize: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 0,
  fontWeight: 'bold',
  textDecoration: 'none',
});

const MobileIcon = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(-100%, 60%)',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: '#657153',
  },
}));

const NavMenu = styled('ul')(({ theme }) => ({
  display: 'flex',
  justifySelf: 'center',
  alignItems: 'center',
  listStyle: 'none',
  textAlign: 'center',
  padding: '0',
  marginRight: 0,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const NavItem = styled('li')({
  height: 80,
});

const NavLinks = styled(LinkScroll)({
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  padding: '0 1rem',
  height: '100%',
  cursor: 'pointer',
  '&.active': {
    borderBottom: '3px solid #ffc857',
  },
});

const NavBtn = styled('nav')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const NavBtnLink = styled(LinkRouter)({
  borderRadius: 50,
  background: '#ffc857',
  whiteSpace: 'nowrap',
  padding: '10px 22px',
  color: '#191716',
  fontSize: 16,
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  textDecoration: 'none',
  '&:hover': {
    transition: 'all 0.2s ease-in-out',
    background: '#fff',
    color: '#010606',
  },
});

const Navbar = ({ toggle }) => {

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const toggleFooter = () => {
    scroll.scrollToBottom();
  }

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/' onClick = {toggleHome}>CoquiTones</NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks to='dashboard' smooth={true} duration={500} spy={true} exact='true' offset={-80}>Dashboard</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to='cdn' smooth={true} duration={500} spy={true} exact='true' offset={-80}>CDN</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to='classifier' smooth={true} duration={500} spy={true} exact='true' offset={-80}>Classifier</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to='spectralanalysis' smooth={true} duration={500} spy={true} exact='true' offset={-80}>Spectral Analysis</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks href='/about'>About</NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin" >Sign In</NavBtnLink>
        </NavBtn>
      </NavbarContainer>
    </Nav>
  );
}

export default Navbar;
