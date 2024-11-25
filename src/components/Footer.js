import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import arrow from '../images/right-arrow.png';
import footerlogo from '../images/footerlogo.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function Footer() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleEnquiryClick = () => {
    navigate(`/enquiry?email=${encodeURIComponent(email)}`);
  };

  const [showResourcesSubLinks, setShowResourcesSubLinks] = useState(false);

  const toggleResourcesSubLinks = () => {
    setShowResourcesSubLinks(!showResourcesSubLinks);
  };

  return (
    <footer id='contact' className="footer">
      <Container fluid>
        <Row className="g-0">
          <Col xs={12} md={4} className="footer-column">
            <p className='footersub'>Reach out to us for expert advice and tools</p>
            <div className="footer-input-container">
              <input
                type="text"
                className="footer-input"
                placeholder="Your email address"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="footer-icon" onClick={handleEnquiryClick} style={{ cursor: 'pointer' }}>
                <img style={{ height: '18px', width: '18px' }} src={arrow} alt="" />
              </div>
            </div>
           <img src={footerlogo} alt="Logo" className="footer-logo" />
            <div className="follow-us">
              <p className='footerhead'>Follow Us On</p>
              <div className="social-icons">
<Link to="https://www.linkedin.com/company/resource-zone/">
                  <i style={{ color: "black" }} className="fa-brands fa-linkedin"></i>
  
</Link>                <i style={{ color: "black" }} className="fa-brands fa-square-facebook"></i>
<Link to="https://www.instagram.com/resourzone?igsh=MTNqZGQ3dHc2MDN4OA==">
                  <i style={{ color: "black" }} className="fa-brands fa-square-instagram"></i>
  
</Link>                <i style={{ color: "black" }} className="fa-brands fa-x-twitter"></i>
              </div>
            </div>
          </Col>

          <Col xs={12} md={4} className="footer-column">
            <p className='footerhead'>Quick Links</p>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="#about">About</a></li>
              <li onClick={toggleResourcesSubLinks} style={{ cursor: 'pointer' }}><a href>Resources</a></li>
              {showResourcesSubLinks && (
                <ul className="footer-sub-links">
                  <li><a href="/hrm">HRM Consultancy</a></li>
                  <li><a href="http://www.cadproa.com">CAD</a></li>
                </ul>
              )}
              <li><a href="/career">Careers</a></li>
              <li><a href="/contact">Contact us</a></li>
            </ul>
            <p className='footerhead'>Contact Info</p>
            <p className='footer-services'>
              <a href="https://wa.me/+97431606084" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                WhatsApp: +97431606084
              </a>
            </p>
            <p className='footer-services'>
              <a href="mailto:Business@resourzone.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                Email: Business@resourzone.com
              </a>
            </p>
          </Col>

          <Col xs={12} md={4} className="footer-column">
            <p className='footerhead'>Services</p>
            <ul className="footer-services">
              <li>CV Sourcing & Recruitment</li>
              <li>Overseas Recruitment Support</li>
              <li>Payroll Management</li>
              <li>HR Department Setup</li>
              <li>Supply of Skilled Professionals & Office Staff</li>
              <li>HR Information Management Software Solutions</li>
              <li>HR Reports Development & Customization</li>
              <li>Strategic HR Business Partnership</li>
              <li>Legal Advisory on Qatar Labour and Commercial Laws</li>
              <li>Empowering Your Vision with Expert Business Plans</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
