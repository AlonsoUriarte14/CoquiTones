import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import DiegoPic from '../components/images/DiegoAlonsoPFP.jpeg'
import EdwinPic from '../components/images/EdwinCamuyPFP.png'
import RolandoPic from '../components/images/RolandoRiosPFP.jpeg'
import BarAndNav from "../components/shared/BarAndNav";
import theme from "../components/shared/Theme"
import FileUpload from "../components/shared/FileUpload";

const studentList = [{name: "Diego A. Santiago Uriarte", image: DiegoPic, bio: "Software Engineer Student" },
                     {name: "Edwin J. Camuy Medina", image: EdwinPic, bio: 'Software Engineer Student' },
                     {name: "Rolando Ríos Bonilla", image: RolandoPic, bio: 'Software Engineer Student' }];

const About = () => {

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <BarAndNav />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: "auto",
                                }}
                            >
                                <Typography variant="h1" color="primary" align="center">
                                    About Page
                                </Typography>
                                
                                <hr/>

                                <Typography variant="h5" color="black" align="center">
                                    Mission Statement
                                </Typography >
                                <Typography variant="p" color="black" align="left">

                                    One of the many beautiful things in Puerto Rico is its nature,
                                    with the coquí frog at the forefront as a cultural symbol of Puerto Rico.
                                    Unfortunately, due to widespread issues like deforestation
                                    and forest fires, around 60% of coquís are in danger of going extinct.
                                    CoquiTones, in collaboration with Proyecto Coqui, are
                                    committed to the conservation of the coqui species.
                                    Our mission is to enhance hardware implementation,
                                    streamline software usability, and optimize data
                                    structure to bolster the technological aspects of preservation.
                                </Typography>

                                <Typography variant='h5' color="black" align="center">

                                    Who We Are
                                </Typography>

                                <Typography variant='p' color="black">

                                    We are a trio of students from the University of Puerto Rico Mayaguez engaged in our Capstone Project.
                                    Drawing upon our collective academic journey, we are leveraging our knowledge and acquiring new skills essential for the project's success.
                                    [MORE NEEDED]
                                </Typography>
                                <Box sx={{
                                    pt: 4, 
                                    display: 'flex', 
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    gap: 4, width: '100'}}>

                                    {studentList.map((item, index) => (
                                        <div key={index} style={{ textAlign: 'center'}}>
                                            <img src={item.image} alt={item.name} style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
                                            <Typography>{item.name}</Typography>
                                            <Typography gutterBottom='true'>{item.bio}</Typography>
                                        </div>
                                    ))}

                                </Box>

                                <Typography variant="h5" color="black" align="center">

                                    How we Collaborated
                                </Typography>

                                <Typography variant="p" color="black">

                                    Facing various challenges such as manual audio analysis of large volumes of data, ongoing device maintenance, and inconsistent data storage, Proyecto Coqui sought solutions. CoquiTones brought it to them through the implementation of technological advances, bringing efficiency across all stages of the preservation processes undertaken by Proyecto Coqui.
                                </Typography>

                                <Typography variant="h5" color="black" align="center">


                                    Hardware
                                </Typography>
                                <Typography variant="p" color="black" >


                                    By integrating an IoT network, we have created interconnected nodes equipped with multiple sensors spanning a wider area within the forest. These nodes capture both acoustic and meteorological data at 5-minute intervals within a 30-minute cycle. All collected data is transmitted via LTE communications to a remote server. To minimize device retrieval frequency, we've engineered a robust power supply system with the ability to harness solar energy, extending operational lifespan to a minimum of three weeks.
                                </Typography>


                                <Typography variant="h5" color="black" align="center">


                                    Software
                                </Typography>
                                <Typography variant="p" color="black">


                                    We structured the collected data utilizing a Database Management System (DBMS) to provide efficient data manipulation capabilities as required, increasing productivity and facilitating the process. We will also employ a Sound Analysis Tool to transform audio files into spectrograms, further enhancing efficiency. Additionally, we are in the process of developing a machine learning model tasked with automating the identification of the coqui species inside said audio files, which will significantly streamline the workflow and improve productivity.
                                    Future of CoquiTones
                                    Given the educational nature of this endeavor and its non-commercial focus, we have decided to make our project Open-Source. This decision enables anyone to create their own adaptations based on their requirements.[MORE NEEDED]
                                </Typography>


                            </Paper >
                        </Grid>
                    </Container >
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default About;