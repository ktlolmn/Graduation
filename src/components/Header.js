import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import Calendar from './Calendar';
import { FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const eventDate = new Date('2025-05-31'); // Graduation date: May 31, 2024
  const headerRef = useRef();
  const [showContent, setShowContent] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      
      setScrollDirection(isScrollingDown ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowContent(true);
          } else {
            setShowContent(false);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
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
  }, []);

  const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div 
      ref={headerRef} 
      className={`header${showContent ? ' show' : ''} scroll-${scrollDirection}`}
    >
      <div className="header-blur-bg" />
      <div className="collage-container">
        <div className="collage-col left">
          <img src="/images/img1.jpg" alt="Collage 1" className="collage-img img1" />
          <img src="/images/img2.jpg" alt="Collage 2" className="collage-img img2" />
        </div>
        <div className="collage-center">
          <div className="header-title">
            <div className="invited-arc">
              <span>YOU ARE INVITED TO</span>
            </div>
            <div className="graduation-script">Graduation Celebration</div>
            <div className="graduate-name-block">TRAN THI TRA NGAN</div>
          </div>
        </div>
        <div className="collage-col right">
          <img src="/images/img4.jpg" alt="Collage 3" className="collage-img img3" />
          <img src="/images/img3.jpg" alt="Collage 4" className="collage-img img4" />
        </div>
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