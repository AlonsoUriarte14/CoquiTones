export const homeObjOne = {
    id: 'dashboard',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Dashboard',
    headline: 'All Historical Data Presented in a Structured Manner',
    description: 'Using DBMS, the data has been structured in a way that can be presented easily to any user that wants to see historical data.',
    buttonLabel: 'Go To Page',
    buttonRoute: '/Dashboard',
    /*imgStart sets the location of the image in the column. If it is false, the image is to the right. If it is true, the image is to the left*/
    imgStart: false,
    img: require('../../components/images/homedashboard.svg').default,
    alt: 'Dash',
    dark: true,
    primary: true,
    darkText: false
};

export const homeObjTwo = {
    id: 'cdn',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Bio-Acoustic Monitoring',
    headline: 'Deploy and Manage IoT Network to collect data',
    description: 'Deploy these monitors using our using our Open Souce Hardware Design. Collect Acoustic and meteorological data. Cluster Duck Protocol facilitates the establishment of an Internet of Things network, enabling the capability of inter-device communication using a modified LoRa Protocol. ',
    buttonLabel: 'Go To Page',
    buttonRoute: '/CDN',
    /*imgStart sets the location of the image in the column. If it is false, the image is to the right. If it is true, the image is to the left*/
    imgStart: true,
    img: require('../../components/images/homecdn.svg').default,
    alt: 'Dash',
    dark: false,
    primary: false,
    darkText: true
};

export const homeObjThree = {
    id: 'classifier',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Machine Learning Model',
    headline: 'Identify coqui species using Artificial Intelligence',
    description: 'Using Dataiku as the foundation, a machine language model has been built to optimize the coqui species identification process',
    buttonLabel: 'Go To Page',
    buttonRoute: '/Classifier',
    /*imgStart sets the location of the image in the column. If it is false, the image is to the right. If it is true, the image is to the left*/
    imgStart: false,
    img: require('../../components/images/homeclassifier.svg').default,
    alt: 'Dash',
    dark: true,
    primary: true,
    darkText: false
};

export const homeObjFour = {
    id: 'spectralanalysis',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Spectral Analysis',
    headline: 'Facilitate Coqui identification with precision',
    description: 'With the website built-in Sound Analysis Tool, upload your audio file and identify at a precise level the coqui species using Spectrogram Generation.',
    buttonLabel: 'Go To Page',
    buttonRoute: '/SpectralAnalysis',
    /*imgStart sets the location of the image in the column. If it is false, the image is to the right. If it is true, the image is to the left*/
    imgStart: true,
    img: require('../../components/images/homeanalysis.svg').default,
    alt: 'Dash',
    dark: false,
    primary: false,
    darkText: true
};