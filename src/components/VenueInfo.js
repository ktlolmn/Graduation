import React, { useEffect, useRef, useState } from 'react';
import { MdSchool, MdPhone, MdLocationOn, MdAccessTime, MdFavorite, MdLocalParking } from 'react-icons/md';
import './VenueInfo.css';

// Đảm bảo đã thêm link Material Icons vào public/index.html
// <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

const VenueInfo = () => {
  const venueRef = useRef();
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!venueRef.current) return;
      const rect = venueRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight - 80;
      
      if (isInView && !isVisible) {
        setShow(true);
        setIsVisible(true);
      } else if (!isInView && isVisible) {
        setShow(false);
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div ref={venueRef} className={`venue-info${show ? ' show' : ''}`} id="venue" style={{position: 'relative'}}>
      
      <div className="venue-details">
        <h2>Information</h2>
        <p className="addres bold">
          Ho Chi Minh University Of Banking
        </p>
        
        <p className="time">
          <MdAccessTime className="venue-icon" />
          15:30 - 17:00, May 31, 2025
        </p>
        <p className="time">
          <a href="tel:0344223083" className="phone-link">
            <MdPhone className="venue-icon" />
            0344223083
          </a>
        </p>
        <p className="parking">
          Parking available at:
          <a
            className="parking-address"
            href="https://maps.app.goo.gl/z4bMoECfa4Ex4Xg96"
            target="_blank"
            rel="noopener noreferrer"
          >
            Location 1
          </a>
          <span className="parking-or">or</span>
          <a
            className="parking-address"
            href="https://maps.app.goo.gl/jWtM2mLs37F4KAjD7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Location 2
          </a>
        </p>
        <p className="address">
          <MdLocationOn className="venue-icon" />
          56 Hoang Dieu 2, Linh Chieu Ward, Thu Duc City, Ho Chi Minh City
        </p>
      </div>
      <div className="venue-media">
        <div className="venue-image">
          <img src="/images/venue.jpg" alt="Venue" />
        </div>
        <div className="venue-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.3951438929857!2d106.76222293809137!3d10.857520531521118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175279bd5046e39%3A0x4671fb1dd244b78!2zNTYgxJAuIEhvw6BuZyBEaeG7h3UgMiwgTGluaCBDaGnhu4N1LCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1747562276280!5m2!1svi!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VenueInfo; 