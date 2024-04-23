import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { CarouselContainer, CarouselContent, CarouselH1, CarouselP, } from '../components/shared/CarouselStyle';
import { ThemeProvider } from '@emotion/react';
import Sidebar from '../components/shared/Sidebar';
import Navbar from '../components/shared/Navbar';
import { CssBaseline } from '@mui/material';
import theme from '../components/shared/Theme';
import {Paper, Button} from '@mui/material';
import AboutUsSection from '../components/shared/AboutUsSection';
import Footer from '../components/shared/Footer';
import background from '../components/images/AboutBGImage.svg'

function Item(props)
{
    return (
        <CarouselContainer>
            <CarouselContent style={{background:'#191716'}}>
                <CarouselH1>{props.item.name}</CarouselH1>
                <CarouselP>{props.item.description}</CarouselP>
            </CarouselContent>
        </CarouselContainer>
        
    )
}


const About = () => {

    const Background = {
        backgroundImage:`url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(52,52,52, 0.5)',
        height: '100vh',
        width: '100vw',
    }

    var items = [
        {
            name: "Mission Statement",
            description: "One of the many beautiful things in Puerto Rico is its nature, with the coquí frog at the forefront as a cultural symbol of Puerto Rico. Unfortunately, due to widespread issues like deforestation and forest fires, around 60% of coquís are in danger of going extinct. CoquiTones, in collaboration with Proyecto Coqui, are committed to the conservation of the coqui species. Our mission is to enhance hardware implementation, streamline software usability, and optimize data structure to bolster the technological aspects of preservation."
        },
        {
            name: "How we Collaborated",
            description: "Facing various challenges such as manual audio analysis of large volumes of data, ongoing device maintenance, and inconsistent data storage, Proyecto Coqui sought solutions. CoquiTones brought it to them through the implementation of technological advances, bringing efficiency across all stages of the preservation processes undertaken by Proyecto Coqui."
        },
        {
            name: "Hardware",
            description: "By integrating an IoT network, we have created interconnected nodes equipped with multiple sensors spanning a wider area within the forest. These nodes capture both acoustic and meteorological data at 5-minute intervals within a 30-minute cycle. All collected data is transmitted via LTE communications to a remote server. To minimize device retrieval frequency, we've engineered a robust power supply system with the ability to harness solar energy, extending operational lifespan to a minimum of three weeks."
        },
        {
            name: "Software",
            description: "We structured the collected data utilizing a Database Management System (DBMS) to provide efficient data manipulation capabilities as required, increasing productivity and facilitating the process. We will also employ a Sound Analysis Tool to transform audio files into spectrograms, further enhancing efficiency. Additionally, we are in the process of developing a machine learning model tasked with automating the identification of the coqui species inside said audio files, which will significantly streamline the workflow and improve productivity."
        },
        {
            name: "Future of CoquiTones",
            description: "Given the educational nature of this endeavor and its non-commercial focus, we have decided to make our project Open-Source. This decision enables anyone to create their own adaptations based on their requirements.[MORE NEEDED]"
        }
    ]

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

     return (
        <ThemeProvider theme={theme} style={{background:'#191716'}}>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
                <Carousel
                navButtonsAlwaysVisible={true}
                autoPlay={false}
                animation="fade"
                duration={800}
                indicators={true}
                timeout={500}
                cycleNavigation={true}
                height={'80vh'}
                indicatorContainerProps={{
                    style: {
                        zIndex: 1,
                        marginTop: "-50px",
                        position: "relative"
                    }
                }}
                >
                    {
                        items.map( (item, i) => <Item key={i} item={item}/>)
                    }
                </Carousel>
            <AboutUsSection/>
            <Footer/>
        </ThemeProvider>
  )
}

export default About
