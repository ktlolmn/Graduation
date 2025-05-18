import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './ScrollButton.css';

const scrollToNextScreen = () => {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
};

const ScrollButton = () => (
  <button className="scroll-button-fixed" onClick={scrollToNextScreen}>
    <FaChevronDown className="arrow-icon" />
  </button>
);

export default ScrollButton; 