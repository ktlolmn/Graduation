import React from 'react';
import Header from '../components/Header';
import VenueInfo from '../components/VenueInfo';
import ThankYou from '../components/ThankYou';
import GallerySlider from '../components/GallerySlider';
import ScrollButton from '../components/ScrollButton';

const Home = () => {
  return (
    <div style={{overflowX: 'hidden'}} className="home">
      <Header />
      <VenueInfo />
      <GallerySlider />
      <ThankYou />
      <ScrollButton />
    </div>
  );
};

export default Home; 