import React, { useRef, useEffect } from 'react';
import './About.css';
import 'animate.css';

function About() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    const paragraph = paraRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the heading
          heading.classList.add('animate__animated', 'animate__fadeInDown'); 
          // Animate the paragraph
          paragraph.classList.add('animate__animated', 'animate__fadeInUp'); 

          // Remove animation classes after completion for repeated animations
          heading.addEventListener(
            'animationend',
            () => {
              heading.classList.remove('animate__animated', 'animate__fadeInDown');
            },
            { once: true }
          );
          paragraph.addEventListener(
            'animationend',
            () => {
              paragraph.classList.remove('animate__animated', 'animate__fadeInUp');
            },
            { once: true }
          );
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (heading) observer.observe(heading);
    if (paragraph) observer.observe(paragraph);

    return () => {
      if (heading) observer.unobserve(heading);
      if (paragraph) observer.unobserve(paragraph);
    };
  }, []);

  return (
    <div id="about" className="about-container">
      <div className="about-content">
        <p className="who" ref={headingRef}>Who We Are</p>
        <span className="abouthead" ref={headingRef}>Expand Your HR Community</span>
        <p className="aboutpara" ref={paraRef}>
          ResourZone Consultancy & Services stands out as a premier HR consultancy firm in Qatar, offering comprehensive, end-to-end human resource management solutions meticulously tailored to the diverse needs of businesses across various sectors. Leveraging our in-depth knowledge of Qatar’s dynamic market and intricate legal landscape, we excel in a wide range of HR services, including strategic manpower planning, talent acquisition, and efficient payroll management.
          <br/><br/>
          Our expertise extends to setting up HR departments from the ground up, developing robust policies and standard operating procedures (SOPs), and implementing cutting-edge software solutions to streamline HR operations. We also specialize in performance management, strategic consulting, and ensuring compliance with local regulations, positioning ourselves as a dedicated and strategic HR business partner committed to fostering organizational success and growth.
        </p>
      </div>
    </div>
  );
}

export default About;
