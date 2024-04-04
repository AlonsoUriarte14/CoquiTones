import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DiegoPic from '../components/images/DiegoAlonsoPFP.jpeg'
import EdwinPic from '../components/images/EdwinCamuyPFP.png'
import RolandoPic from '../components/images/RolandoRiosPFP.jpeg'
import Navbar from "../components/shared/Navbar";
import theme from "../components/shared/Theme";

const studentList = [
    { name: "Diego A. Santiago Uriarte", image: DiegoPic, bio: "Software Engineer Student" },
    { name: "Edwin J. Camuy Medina", image: EdwinPic, bio: 'Software Engineer Student' },
    { name: "Rolando Ríos Bonilla", image: RolandoPic, bio: 'Software Engineer Student' }
];

const About = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
                <Grid container spacing={4} sx={{justifyContent: 'center'}}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper sx={{ p: 4 }}>
                            <Paper >

                                <Typography variant="h2" color="primary" align="center" gutterBottom>
                                    About
                                </Typography>
                            </Paper>

                            <Typography variant="h4" color="white" align="center" gutterBottom>
                                Mission Statement
                            </Typography>

                            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10 }}>
                                <Typography variant="body1" color="white" align="left">
                                    One of the many beautiful things in Puerto Rico is its nature, with the coquí frog at the forefront as a cultural symbol of Puerto Rico. Unfortunately, due to widespread issues like deforestation and forest fires, around 60% of coquís are in danger of going extinct. CoquiTones, in collaboration with Proyecto Coqui, are committed to the conservation of the coqui species. Our mission is to enhance hardware implementation, streamline software usability, and optimize data structure to bolster the technological aspects of preservation.
                                </Typography>
                            </Paper>

                            <Typography variant="h4" color="white" align="center" sx={{ mt: 4 }} gutterBottom>
                                Who We Are
                            </Typography>

                            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10 }}>
                                <Typography variant="body1" color="white">
                                    We are a trio of students from the University of Puerto Rico Mayaguez engaged in our Capstone Project. Drawing upon our collective academic journey, we are leveraging our knowledge and acquiring new skills essential for the project's success.
                                </Typography>
                            </Paper>

                            <Grid container spacing={4} sx={{ mt: 4 }}>
                                {studentList.map((item, index) => (
                                    <Grid item key={index} xs={12} md={4}>
                                        <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10 }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', borderRadius: '50%' }} />
                                            <Typography variant="subtitle1" color="white" align="center" sx={{ mt: 2 }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="white" align="center">
                                                {item.bio}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>

                            <Typography variant="h4" color="white" align="center" sx={{ mt: 4 }} gutterBottom>
                                How we Collaborated
                            </Typography>

                            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10 }}>
                                <Typography variant="body1" color="white">
                                    Facing various challenges such as manual audio analysis of large volumes of data, ongoing device maintenance, and inconsistent data storage, Proyecto Coqui sought solutions. CoquiTones brought it to them through the implementation of technological advances, bringing efficiency across all stages of the preservation processes undertaken by Proyecto Coqui.
                                </Typography>
                            </Paper>

                            <Typography variant="h4" color="white" align="center" sx={{ mt: 4 }} gutterBottom>
                                Hardware
                            </Typography>

                            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10 }}>
                                <Typography variant="body1" color="white">
                                    By integrating an IoT network, we have created interconnected nodes equipped with multiple sensors spanning a wider area within the forest. These nodes capture both acoustic and meteorological data at 5-minute intervals within a 30-minute cycle. All collected data is transmitted via LTE communications to a remote server. To minimize device retrieval frequency, we've engineered a robust power supply system with the ability to harness solar energy, extending operational lifespan to a minimum of three weeks.
                                </Typography>
                            </Paper>

                            <Typography variant="h4" color="white" align="center" sx={{ mt: 4 }} gutterBottom>
                                Software
                            </Typography>

                            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10 }}>
                                <Typography variant="body1" color="white">
                                    We structured the collected data utilizing a Database Management System (DBMS) to provide efficient data manipulation capabilities as required, increasing productivity and facilitating the process. We will also employ a Sound Analysis Tool to transform audio files into spectrograms, further enhancing efficiency. Additionally, we are in the process of developing a machine learning model tasked with automating the identification of the coqui species inside said audio files, which will significantly streamline the workflow and improve productivity.
                                </Typography>
                            </Paper>

                            <Typography variant="h4" color="white" align="center" sx={{ mt: 4 }} gutterBottom>
                                Future of CoquiTones
                            </Typography>

                            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10 }}>
                                <Typography variant="body1" color="white">
                                    Given the educational nature of this endeavor and its non-commercial focus, we have decided to make our project Open-Source. This decision enables anyone to create their own adaptations based on their requirements.[MORE NEEDED]
                                </Typography>
                            </Paper>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default About;
