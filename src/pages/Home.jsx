// eslint-disable-next-line no-unused-vars
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import '../index.css';
import ContentHomePage from '../components/ContentHomePage';

function Home() {
    return (
        <>
            <HeaderComponent modeTheme='light'/>
            <ContentHomePage />
            <FooterComponent />
        </>
    );
}

export default Home;
