import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';
import logo from '../images/lOGO RESOURZONE.svg';
import Application from '../Pages/Application';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const buttonLabel = (location.pathname === '/' || location.pathname === '/hrm' || location.pathname === '/terms' || location.pathname === '/privacy') 
    ? 'Enquire' 
    : 'Apply Now';
  const navigateTo = (location.pathname === '/' || location.pathname === '/hrm') 
    ? '/enquiry' 
    : '/application';

  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleButtonClick = () => {
    if (location.pathname === '/career') {
      openModal();
    } else {
      navigate(navigateTo);
    }
  };

  const handleAboutClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleServicesClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Detect clicks outside the Navbar to close the menu
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [expanded]);

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: -100, opacity: 0 }} 
      transition={{ duration: 1 }}
    >
      <Navbar 
        expand="lg" 
        className="header px-3 header-landing-container" 
        expanded={expanded} 
        ref={navbarRef}
      >
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <motion.div
              className="triangle-element"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="triangle" />
            </motion.div>
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(!expanded)} 
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="nav-link-custom" onClick={() => setExpanded(false)}>Home</Nav.Link>
              <Nav.Link onClick={handleAboutClick} className="nav-link-custom">About Us</Nav.Link>
              <Nav.Link onClick={handleServicesClick} className="nav-link-custom">Our Services</Nav.Link>
              
              <NavDropdown
                title={<span className="nav-link-custom">Divisions</span>}
                id="resources-dropdown"
                className="no-dropdown-icon"
                menuVariant="light"
              >
                <motion.div 
                  initial={{ y: -20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  exit={{ y: -20, opacity: 0 }} 
                  transition={{ duration: 0.5 }}
                >
                  <NavDropdown.Item href="/hrm" className="no-color-change" onClick={() => setExpanded(false)}>
                    HRM Consultancy
                  </NavDropdown.Item>
                  <NavDropdown.Item href="http://www.cadproa.com" className="no-color-change" onClick={() => setExpanded(false)}>
                    CAD PRO
                  </NavDropdown.Item>
                </motion.div>
              </NavDropdown>

              <Nav.Link href="/career" className="nav-link-custom" onClick={() => setExpanded(false)}>Career</Nav.Link>
              <Nav.Link href="#contact" className="nav-link-custom" onClick={() => setExpanded(false)}>Contact Us</Nav.Link>
            </Nav>

            <motion.button 
              className="custom-button ms-lg-3 mt-2 mt-lg-0" 
              onClick={handleButtonClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {buttonLabel}
            </motion.button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Application show={showModal} onClose={closeModal} />
    </motion.div>
  );
};

export default Header;
