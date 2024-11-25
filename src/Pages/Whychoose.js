import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Whychoose.css';
// // import brain from '../images/_x32__26_.png';
// import award from '../images/award-quality-svgrepo-com 1.png';
// import solution from '../images/customize-svgrepo-com 1.png';
// import partnership from '../images/partnership-svgrepo-com 1.png';
// import timeline from '../images/timeline-svgrepo-com 1.png';
// import temperature from '../images/low-temperature-thermometer-svgrepo-com 1.png';
import { GiBrain } from "react-icons/gi";
import { FaAward, FaHandshake,  FaTools } from "react-icons/fa"; 
import { FiCheckCircle  } from "react-icons/fi";
import { IoWalletOutline } from 'react-icons/io5';

function Whychoose() {
  const cardRefs = useRef([]);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    const currentVisionRef = visionRef.current;
    const currentMissionRef = missionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === currentVisionRef) {
              entry.target.classList.add('animate-left');
            }
            if (entry.target === currentMissionRef) {
              entry.target.classList.add('animate-right');
            }
          } else {
            entry.target.classList.remove('animate-left', 'animate-right');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (currentVisionRef) observer.observe(currentVisionRef);
    if (currentMissionRef) observer.observe(currentMissionRef);

    return () => {
      if (currentVisionRef) observer.unobserve(currentVisionRef);
      if (currentMissionRef) observer.unobserve(currentMissionRef);
    };
  }, []);

  // Animation for cards
  useEffect(() => {
    const currentRefs = cardRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          } else {
            entry.target.classList.remove('fade-in');
          }
        });
      },
      { threshold: 0.3 }
    );

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  
  const cardData = [
    {
      title: "In-Depth Knowledge",
      description: "We possess extensive expertise in Qatar’s labor laws and market trends ensuring that your HR practices are compliant and up-to-date.",
      icon: <GiBrain />
      ,
    },
    {
      title: "Customized Solutions",
      description: "Our HR solutions are tailored to align seamlessly with your strategic goals, driving efficiency and growth.",
      icon: <FaTools />
    },
    {
      title: "Commitment to Excellence",
      description: "We prioritize compliance, best practices, and superior client service, delivering reliable and timely results.",
      icon: <FaAward />
    },
    {
      title: "Proactive Partnership",
      description: "We adopt a proactive, partnership-based approach to foster your business's success and growth.",
      icon: <FaHandshake />
    },
    {
      title: "Reliability and Timeliness",
      description: "We pride ourselves on delivering on time, ensuring reliability and consistency in all our services.",
      icon:<FiCheckCircle />
    },
    {
      title: "Cost-Effective Solutions",
      description: "Our services are designed to be budget-friendly, providing exceptional value without compromising on quality.",
      icon: <IoWalletOutline />
    }
    
    
  ];

  return (
    <Container className="whychoose-container w-100 container-fluid">
      <div className="whychoose-header">
        <p className="whychoose-title">Why Resourzone?</p>
        <p className="whychoose-subtitle">The ResourZone Advantage</p>
        <p className="whychoose-description">
        Partnering with ResourZone provides you with a dedicated team of HR professionals who are 
committed to elevating your business through personalized solutions and expert guidance. 
Here’s why companies in Qatar choose us:        </p>
      </div>
      <Row>
        {cardData.map((card, index) => (
          <Col key={index} md={4} sm={6} className="d-flex justify-content-center">
            <Card className="whychoose-card" ref={(el) => (cardRefs.current[index] = el)}>
              <Card.Body className="text-center">
                <div className="card-icon-img"><span style={{color:'#33d0a5'}}>{card.icon}</span></div>
                <Card.Title className="card-title mt-4">{card.title}</Card.Title>
                <Card.Text className="card-text">{card.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className='mt-3'>
        <Col md={6} >
          <p ref={visionRef} className="ourvision">Our Vision</p>
          <p className="ourvisionpara">
          To establish RESOURZONE as the most trusted business partner in Qatar by delivering exceptional HR solutions 
          that add value to our clients.          </p>
        </Col>
        <Col  md={6}>
          <p ref={missionRef} className="ourmission">Our Mission</p>
          <p className="ourmissionpara">
          To foster an innovative and engaging environment that attracts and retains top talent, positioning 
          RESOURZONE as a leader in HR consultancy within our targeted markets.          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Whychoose;
