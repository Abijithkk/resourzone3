import React, { useEffect, useRef } from 'react';
import './own.css';

const Own = () => {
  // Create refs for styled boxes
  const boxRefs = useRef([]);
  
  // Define box names and positions
  const boxData = [
    { name: 'Box 1'},
    { name: 'Box 2' },
    { name: 'Box 3' },
    { name: 'Box 4'},
  ];

  useEffect(() => {
    // Get the dimensions and positions of the styled boxes
    boxRefs.current.forEach((box, index) => {
      if (box) {
        const boxRect = box.getBoundingClientRect();
        const dotPosition = calculateDotPosition(index);

        // Create and position connection lines
        const line = document.createElement('div');
        line.className = 'connection-line';
        line.style.height = `${dotPosition.y - boxRect.top + 15}px`; // Adjust for desired height
        line.style.left = `${boxRect.left + boxRect.width / 2 - 1}px`; // Center line horizontally
        line.style.top = `${boxRect.top}px`; // Start from the top of the box
        document.querySelector('.right-col').appendChild(line);
      }
    });
  }, []);

  const calculateDotPosition = (index) => {
    // Calculate dot position based on index
    const radius = 100; // Adjust this based on your design
    const centerX = 200; // Adjust based on your layout
    const centerY = 100; // Adjust based on your layout
    const angle = (Math.PI / 2) + (index * (Math.PI / 4)); // Angle increment based on index
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY - radius * Math.sin(angle) // Invert Y because of screen coordinates
    };
  };

  return (
    <div className="own-page">
      <div className="left-col">
        <div className="circle-container">
          <div className="circle inner-circle">
            <img 
              src="https://i.postimg.cc/pTDMkhQn/logo-2.png" 
              alt="Logo" 
              className="circle-image"
            />
          </div>
          <div className="circle left-semi-circle"></div>
          <div className="circle right-semi-circle"></div>
          <div className="circle right-outline-semi-circle">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
        </div>
      </div>
      <div className="right-col">
        <div className="styled-boxes">
          {boxData.map((box, index) => (
            <div
              className={`styled-box styled-box-${index + 1}`}
              key={index}
              ref={(el) => (boxRefs.current[index] = el)}
            >
              <div className="inner-circle">
                <img src="https://i.postimg.cc/xCgMpbJF/Icon.png" alt={`${box.name} Icon`} />
              </div>
              <p className="box-name">{box.name}</p>
              <div className="end-circle">
                <span className="arrow">&#8594;</span> {/* Unicode arrow character */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Own;
