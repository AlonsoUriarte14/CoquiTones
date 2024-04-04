import React, { useState } from 'react';
import Sidebar from '../components/shared/Sidebar';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import HeroSection from '../components/shared/HeroSection';
import InfoSection from '../components/shared/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/shared/InfoData';
const Home = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isHome, setIsHome] = useState(true)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} isHome={isHome} />
      <HeroSection />
      <InfoSection {...homeObjOne} setIsHome={setIsHome} />
      <InfoSection {...homeObjTwo} setIsHome={setIsHome} />
      <InfoSection {...homeObjThree} setIsHome={setIsHome} />
      <InfoSection {...homeObjFour} setIsHome={setIsHome} />
      <Footer />
    </>
  )
}

export default Home;
