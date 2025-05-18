import React from 'react';
import './Calendar.css';

const Calendar = ({ date }) => {
  const eventDate = new Date(date);
  const month = eventDate.toLocaleString('en-US', { month: 'long' });
  const day = eventDate.getDate();
  const year = eventDate.getFullYear();

  const daysInMonth = new Date(eventDate.getFullYear(), eventDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(eventDate.getFullYear(), eventDate.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar">
      <div className="calendar-header">
        
        <span className="year">{month}, {year}</span>
      </div>
      <div className="calendar-grid">
        <div className="weekdays">
          {weekdays.map((wd, idx) => <span key={idx}>{wd}</span>)}
        </div>
        <div className="days">
          {days.map((dayNum, index) => (
            <div 
              key={index} 
              className={`day ${dayNum === day ? 'event-day' : ''} ${dayNum === null ? 'empty' : ''}`}
            >
              {dayNum}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar; 