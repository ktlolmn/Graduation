import React, { useState, useRef, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './GallerySlider.css';

const images = [
  { src: '/images/img1.jpg', alt: 'Gallery 1' },
  { src: '/images/img2.jpg', alt: 'Gallery 2' },
  { src: '/images/img3.jpg', alt: 'Gallery 3' },
  { src: '/images/img4.jpg', alt: 'Gallery 4' },
  { src: '/images/img5.jpg', alt: 'Gallery 5' },
  { src: '/images/img6.jpg', alt: 'Gallery 6' },
];

const GallerySlider = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const itemRefs = useRef([]);
  const [visible, setVisible] = useState(Array(images.length).fill(false));

  useEffect(() => {
    const observers = [];
    itemRefs.current.forEach((ref, i) => {
      if (!ref) return;
      observers[i] = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(v => {
              const newV = [...v];
              newV[i] = true;
              return newV;
            });
          } else {
            setVisible(v => {
              const newV = [...v];
              newV[i] = false;
              return newV;
            });
          }
        },
        { 
          threshold: 0.2,
          rootMargin: '50px'
        }
      );
      observers[i].observe(ref);
    });
    return () => observers.forEach(obs => obs && obs.disconnect());
  }, []);

  return (
    <div className="gallery-section">
      <h2 className="gallery-title">Album</h2>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div
            key={i}
            ref={el => (itemRefs.current[i] = el)}
            className={`gallery-grid-item ${i % 2 === 0 ? 'from-left' : 'from-right'} ${visible[i] ? 'show' : ''}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="gallery-img-grid"
              onClick={() => { setOpen(true); setIndex(i); }}
            />
          </div>
        ))}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map(img => ({ src: img.src, alt: img.alt }))}
          index={index}
          on={{ view: ({ index }) => setIndex(index) }}
        />
      </div>
    </div>
  );
};

export default GallerySlider;