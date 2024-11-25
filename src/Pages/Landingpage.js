import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion';
function LandingPage() {
  const ref = useRef(null);
  const isInView = useInView(ref); 

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './ResourZone.pdf';
    link.download = 'ResourZone_Profile.pdf';
    link.click();
  };

  return (
    <Container style={{zIndex:'1'}} fluid className="landing-page" ref={ref}>
      <Row className="align-items-center">
        <Col md={6} className="text-content">
          <motion.span
            className="lanhead"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            Empowering Businesses with Comprehensive  
          </motion.span>
          <motion.span
            className="lanhead2 ms-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
              HR Solutions
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
           Your Strategic Partner for Recruitment, HR Outsourcing, Payroll Excellence, CV Sourcing, Tailored Compensation & Benefits Plans, HR Department Setup, Skilled Workforce Supply, Advanced HR Software (ERP), Customized Reports, Strategic HR Planning, Legal Compliance, and Expert Business Plans in Qatar.
          </motion.p>
          <motion.button
            className="custom-button2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            onClick={handleDownload}
          >
            <FontAwesomeIcon icon={faDownload} style={{ marginRight: '8px' }} />
            Company Profile
          </motion.button>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
