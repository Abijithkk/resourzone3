import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './hrm1.css';
import hrm1 from '../images/hrmimage1.png';
import hrm3 from '../images/hrmimage3.png';
import { useLocation, useNavigate } from 'react-router-dom';

function Hrm1() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ref: leftRef, inView: leftInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: rightRef, inView: rightInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const leftVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const rightVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const handleAboutClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  return (
    <Container fluid className="hrm1-container">
      <Row className='hrm1row'>
        {/* Left Section */}
        <Col md={6} className="left-section">
          <motion.div 
            ref={leftRef} // Attach the ref from useInView
            variants={leftVariants} 
            initial="hidden" 
            animate={leftInView ? "visible" : "hidden"} // Animate left section based on inView state
          >
            <p className='hrm1p'>At ResourZone, we offer a comprehensive range of HR services designed to enhance your business operations, optimize workforce management, and ensure compliance with local regulations.</p>
            <button onClick={handleAboutClick} className='hrm1button'>Learn more</button>
          </motion.div>
        </Col>

        {/* Right Section */}
        <Col md={6} className="right-section">
          <motion.img 
            src={hrm1} 
            alt="Top" 
            className="image-top" 
            ref={rightRef} // Attach the ref from useInView
            variants={rightVariants} 
            initial="hidden" 
            animate={rightInView ? "visible" : "hidden"} // Animate image based on inView state
          />
          <div className="bottom-content">
            <motion.p 
              className="bottom-text"
              variants={rightVariants} 
              initial="hidden" 
              animate={rightInView ? "visible" : "hidden"} // Animate text based on inView state
            >
              We provide tailored solutions to meet the unique needs of each client, ensuring that your HR strategy is aligned with your business goals.
            </motion.p>
            <motion.img 
              src={hrm3} 
              alt="Bottom Right" 
              className="image-bottom" 
              variants={rightVariants} 
              initial="hidden" 
              animate={rightInView ? "visible" : "hidden"} // Animate image based on inView state
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Hrm1;
