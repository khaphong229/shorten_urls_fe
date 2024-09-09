// eslint-disable-next-line no-unused-vars
import React from 'react';
import HeaderComponent from '../../components/HomePage/HeaderComponent';
import FooterComponent from '../../components/HomePage/FooterComponent';
import '../../index.css';
import ContentHomePage from '../../components/HomePage/ContentHomePage';

function Home() {
    return (
        <>
            <HeaderComponent modeTheme="light" selectedPage="1" />
            <ContentHomePage />
            <FooterComponent />
        </>
    );
}

export default Home;
