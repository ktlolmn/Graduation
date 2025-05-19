import React, { useState } from 'react';
import RSVPModal from './RSVPModal';
import './ThankYou.css';

const ThankYou = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="thankyou-section">
      <div className="thankyou-content">
        <h3>Thank You!</h3>
        <div className="button-container">
          <button 
            className="rsvp-button"
            onClick={() => setIsModalOpen(true)}
          >
            Send Wishes
          </button>
          <span className="click-here">Click here</span>
        </div>
        <p>
          Thank you for your love and support.<br/>
          It is my great honor to welcome you to this special day!
        </p>
      </div>
      <RSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ThankYou; 