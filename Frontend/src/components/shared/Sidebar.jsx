import React from 'react';
import { styled } from '@mui/material/styles';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { FaTimes } from 'react-icons/fa';

export const SidebarContainer = styled('aside')(({ isOpen }) => ({
  position: 'fixed',
  zIndex: 999,
  width: '100%',
  height: '100%',
  background: '#0d0d0d',
  display: 'grid',
  alignItems: 'center',
  top: isOpen ? 0 : '-100%',
  left: 0,
  transition: '0.3s ease-in-out',
  opacity: isOpen ? '100%' : '0',
}));

export const CloseIcon = styled(FaTimes)({
  color: '#fff',
});

export const Icon = styled('div')({
  position: 'absolute',
  top: '1.2rem',
  right: '1.5rem',
  background: 'transparent',
  fontSize: '2rem',
  cursor: 'pointer',
  outline: 'none',
});

export const SidebarWrapper = styled('div')({
  color: '#fff',
});

export const SidebarMenu = styled('ul')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'repeat(6, 80px)',
  textAlign: 'center',
  [theme.breakpoints.down('xs')]: {
    gridTemplateRows: 'repeat(6, 60px)',
  },
}));

export const SidebarLink = styled(LinkScroll)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  textDecoration: 'none',
  listStyle: 'none',
  transition: '0.2s ease-in-out',
  color: '#fff',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    color: '#657153',
    transition: '0.2s ease-in-out',
  },
});

export const SideBtnWrap = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

export const SidebarRoute = styled(LinkRouter)({
  borderRadius: '50px',
  background: '#657153',
  whiteSpace: 'nowrap',
  padding: '16px 64px',
  color: '#010606',
  fontSize: '16px',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  textDecoration: 'none',
  '&:hover': {
    background: '#fff',
    color: '#010606',
    transition: 'all 0.2s ease-in-out',
  },
});



const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="dashboard" onClick={toggle}>Dashboard</SidebarLink>
                <SidebarLink to="cdn" onClick={toggle}>CDN</SidebarLink>
                <SidebarLink to="classifier" onClick={toggle}>Classifier</SidebarLink>
                <SidebarLink to="spectral" onClick={toggle}>Spectral Analysis</SidebarLink>
                <SidebarLink to="signup" onClick={toggle}>Sign Up</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to='/signin'>Sign In</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar;