import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import Calendar from './Calendar';
import { FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const eventDate = new Date('2025-05-31'); // Graduation date: May 31, 2024
  const headerRef = useRef();
  const [showContent, setShowContent] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY;
          
          if (entry.isIntersecting) {
            // Reset animation
            setShowContent(false);
            // Force a re-render to trigger animation
            requestAnimationFrame(() => {
              setShowContent(true);
            });
          } else {
            setShowContent(false);
          }
          
          setLastScrollY(currentScrollY);
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for smoother detection
        rootMargin: '-80px 0px'
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, [lastScrollY]);

  const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div ref={headerRef} className={`header${showContent ? ' show' : ''}`}>
      <div className="image-container">
        <div className="image-wrapper left">
          <img src="/images/img2.jpg" alt="Left decoration" />
        </div>
        <div className="image-wrapper center">
          <img src="/images/img1.jpg" alt="Center image" />
        </div>
        <div className="image-wrapper right">
          <img src="/images/img3.jpg" alt="Right decoration" />
        </div>
      </div>
      <div className="header-title">
        <div className="invited-arc">
          <span>YOU ARE INVITED TO</span>
        </div>
        <div className="graduation-script">Graduation Celebration</div>
        <div className="graduate-name-block">TRAN THI TRA NGAN</div>
      </div>
      <div className="date-info">
        <Calendar date={eventDate} />
      </div>
      <div className="graduate-message">
        I am deeply grateful for your support throughout my journey. Please join me in celebrating this special milestone!
      </div>
    </div>
  );
};

export default Header; 