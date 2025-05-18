import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import Lightbox from 'yet-another-react-lightbox';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  const [centerIndex, setCenterIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const sliderRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    centerMode: !isMobile,
    centerPadding: '0px',
    focusOnSelect: true,
    draggable: true,
    swipe: true,
    afterChange: (current) => {
      setCenterIndex(isMobile ? current % images.length : (current + 1) % images.length);
    },
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          draggable: true,
          swipe: true,
        },
      },
    ],
  };

  return (
    <div className="gallery-slider">
      <Slider {...settings} ref={sliderRef}>
        {images.map((img, i) => (
          <div key={i} className="gallery-slide">
            <img
              src={img.src}
              alt={img.alt}
              className={`gallery-img${isMobile ? ' gallery-img-mobile' : ''}`}
              style={{ 
                pointerEvents: (isMobile || centerIndex === i) ? 'auto' : 'none', 
                cursor: (isMobile || centerIndex === i) ? 'pointer' : 'default' 
              }}
              onClick={() => {
                if (isMobile || centerIndex === i) {
                  setOpen(true); 
                  setIndex(i);
                }
              }}
            />
          </div>
        ))}
      </Slider>
      <Lightbox
        styles={{ container: { marginTop: "20px" } }}
        open={open}
        close={() => setOpen(false)}
        slides={images.map(img => ({ src: img.src, alt: img.alt }))}
        index={index}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </div>
  );
};

export default GallerySlider;