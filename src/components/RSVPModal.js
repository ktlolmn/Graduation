import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './RSVPModal.css';

const RSVPModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const currentTime = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const templateParams = {
        from_name: formData.name,
        message: formData.message,
        to_email: 'tranthitrangan2003@gmail.com',
        time: currentTime
      };

      await emailjs.send(
        'service_r32hjhf',
        'template_ouzxac3',
        templateParams,
        'dZKZb-tTBBtSEQX-e'
      );

      setSubmitStatus('success');
      setFormData({ name: '', message: '' });
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Please Respond</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message / Wishes</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows="4"
            />
          </div>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
          {submitStatus === 'success' && (
            <p className="success-message">Thank you for your wishes!</p>
          )}
          {submitStatus === 'error' && (
            <p className="error-message">An error occurred, please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RSVPModal; 