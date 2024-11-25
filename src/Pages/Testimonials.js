import React, { useState, useEffect } from 'react';
import './Testimonial.css';
import t1 from '../images/Testimonial1.png';
import t2 from '../images/Testimonial2.png';

const testimonialsData = [
  {
    id: 1,
    text: "Resourzone Consultancy Services and their CADPRO division have been a valuable partner for Tableau Fine Arts. Their commitment to quality, reliability, and professionalism has greatly supported us on multiple projects.",
    name: "Mr Sam HS, Managing Director",
    subname: "Tableau Fine Arts",
    image: t2,
    company:"Tableau"
  },
  {
    id: 2,
    text: "We, at Time Rako Hotel, have been associated with Resourzone Consultancy Services, particularly their CADPRO division, since 2021. Throughout our partnership, Resourzone has consistently demonstrated exceptional performance in all assigned projects. Their team is professional, dependable, and approachable, making our collaboration highly effective and seamless. We highly recommend their services.",
    name: "Mr. Mohamed Nizam, Chief Procurement Officer",
    subname: "Time Rako Hotel, Doha Qatar",
    image: t1,
    company:"Time"

  },
  {
    id: 3,
    text: "Since 2021, Resourzone's Engineering Project Management division has been a trusted partner for Electro Mechanical Services Consultancy. Their exceptional work, professionalism, and reliability have consistently exceeded our expectations.",
    name: "Mr. Michael Roberts ,Project Director",
    subname: "E.M.S Consultancy",
    image: null,
    company:"E.M.S Consultancy"

  },
  {
    id: 4,
    text: "We have been associated with Resourzone Consultancy through their CADPRO division since 2021, consistently impressed by their professionalism and reliability. Their friendly team makes collaboration seamless, and we highly recommend their services",
    name: "Mubarak Kadavath ",
    subname: "Mechanical Construction Manager",
    image: null,
    company:"MEDGULF"
  },
  {
    id:5,
    text:"Cater Qatar Trading & Contracting WLL has been associated with Resourzone Consultancy Services and their engineering project services division since 2021. They consistently deliver great results, and their friendly team is always professional and dependable. We highly recommend them for any project needs.",
    name:"Nowshad H ,Founder & CEO",
    subname:"Cater Qatar",
    image:null,
    company:"Cater Qatar"


  }
];
function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Detect if device is touch-enabled
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Automatic sliding functionality with animation trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);  // Start animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        );
        setAnimate(false); // Reset animation after the transition
      }, 500);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  // Reset animation state after transition
  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(false), 500); // Reset after animation
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  // Functions to handle swipe
  const handleSwipeStart = (e) => {
    e.target.startX = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleSwipeEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    if (e.target.startX - endX > 50) {
      goToNext();
    } else if (e.target.startX - endX < -50) {
      goToPrevious();
    }
  };

  const goToNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
      setAnimate(false);
    }, 500);
  };

  const goToPrevious = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
      );
      setAnimate(false);
    }, 500);
  };

  return (
    <div className="testimonial-container">
      <p className="testimonial-head">Client Testimonials</p>
      <p className="testimonial-subhead">Our Client’s Success Stories</p>
    
      <div
        className="testimonial-cards"
        onTouchStart={isTouchDevice ? handleSwipeStart : null}
        onTouchEnd={isTouchDevice ? handleSwipeEnd : null}
      >
        {/* Left card */}
        {!isTouchDevice && (
          <div className={`testimonial-card left-card ${animate ? 'animate' : ''}`} onClick={goToPrevious}>
            <div className="circle-image">
              {testimonialsData[(currentIndex - 1 + testimonialsData.length) % testimonialsData.length].image ? (
                <img
                  src={testimonialsData[(currentIndex - 1 + testimonialsData.length) % testimonialsData.length].image}
                  alt="Profile"
                />
              ) : (
                <div className="placeholder-text">
                  {testimonialsData[(currentIndex - 1 + testimonialsData.length) % testimonialsData.length].company}
                </div>
              )}
            </div>
            <p className="testimonial-name">
              {testimonialsData[(currentIndex - 1 + testimonialsData.length) % testimonialsData.length].name}
            </p>
            <p className="testimonial-sub-name">
              {testimonialsData[(currentIndex - 1 + testimonialsData.length) % testimonialsData.length].subname}
            </p>
            <p className="testimonial-text">
              {testimonialsData[(currentIndex - 1 + testimonialsData.length) % testimonialsData.length].text}
            </p>
          </div>
        )}

        {/* Center card */}
        <div className={`testimonial-card center-card ${animate ? 'animate' : ''}`}>
          <div className="circle-image">
            {testimonialsData[currentIndex].image ? (
              <img src={testimonialsData[currentIndex].image} alt="Profile" />
            ) : (
              <div className="placeholder-text">
                {testimonialsData[currentIndex].company}
              </div>
            )}
          </div>
          <p className="testimonial-centername">{testimonialsData[currentIndex].name}</p>
          <p className="testimonial-centersub-name">{testimonialsData[currentIndex].subname}</p>
          <p className="testimonial-centertext">{testimonialsData[currentIndex].text}</p>
        </div>

        {/* Right card */}
        {!isTouchDevice && (
          <div className={`testimonial-card right-card ${animate ? 'animate' : ''}`} onClick={goToNext}>
            <div className="circle-image">
              {testimonialsData[(currentIndex + 1) % testimonialsData.length].image ? (
                <img
                  src={testimonialsData[(currentIndex + 1) % testimonialsData.length].image}
                  alt="Profile"
                />
              ) : (
                <div className="placeholder-text">
                  {testimonialsData[(currentIndex + 1) % testimonialsData.length].company}
                </div>
              )}
            </div>
            <p className="testimonial-name">
              {testimonialsData[(currentIndex + 1) % testimonialsData.length].name}
            </p>
            <p className="testimonial-sub-name">
              {testimonialsData[(currentIndex + 1) % testimonialsData.length].subname}
            </p>
            <p className="testimonial-text">
              {testimonialsData[(currentIndex + 1) % testimonialsData.length].text}
            </p>
          </div>
        )}
      </div>

      {/* Dots for manual navigation */}
      <div className="testimonial-dots">
        {testimonialsData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
