import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import './Application.css';
import application from '../images/application.png';
import { getAlljobs, Registerapplication } from '../services/allApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Application({ show, onClose }) {
  const [jobTitles, setJobTitles] = useState([]);
  const [cvName, setCvName] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    job_position: '',
    message: '',
    cv: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const response = await getAlljobs();
        const activeTitles = response
          .filter(job => job.status === true)  // Filter jobs with status 'true'
          .map(job => job.jobRole);  // Map to get job roles
  
        setJobTitles(activeTitles);  // Set filtered job titles
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };
  
    fetchJobTitles();
  }, []);
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      // Check file type and size
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size exceeds 2MB limit');
        return;
      }
  
      // Update the file name with slicing for long names
      const slicedName =
        file.name.length > 20 ? `${file.name.slice(0, 17)}...` : file.name;
      
      setCvName(slicedName); // Set the sliced file name
      setFormData((prev) => ({ ...prev, cv: file })); // Update the form data
    } else {
      // Reset state if no file is selected
      setCvName('');
      setFormData((prev) => ({ ...prev, cv: null }));
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Check required fields
    if (!formData.Name || !formData.email || !formData.job_position || !formData.cv) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("Name", formData.Name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("job_position", formData.job_position);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("cv", formData.cv);

    try {
      const response = await Registerapplication(formDataToSend);

      if (response.status === 201 && response.data.message) {
        toast.success("Application submitted successfully!");
        onClose();

        setFormData({ Name: '', email: '', job_position: '', message: '', cv: null });
        setCvName('');
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      if (error.response) {
        toast.error(`Submission error: ${error.response.status} - ${error.response.data.message || "Please try again later."}`);
      } else if (error.request) {
        toast.error("No response received from the server. Please check your connection.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
    finally {
      // Set loading state to false when submission is complete
      setIsLoading(false);
    }
  };


  return (
    <div>
    

      {/* Modal component */}
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Apply for a Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToastContainer />
          {isLoading && (
        <div className="overlay2">
          <Spinner animation="border" role="status" />
        </div>
      )}
          <Row>
            <Col md={4} className="application-image-col">
              <div className="application-image-bg">
                <img 
                  src={application}
                  alt="application" 
                  className="img-fluid application-image"
                />
                <div className="application-overlay-content">
                <p className="application-image-description">
   Explore Qatar's inspiring growth and innovation, shaped by dynamic development and sustainable progress aligned with the Qatar National Vision 2030.
</p>
                  <div className="application-social-icons">
<Link to="https://www.linkedin.com/company/resource-zone/">
                      <FontAwesomeIcon icon={faLinkedin} className="application-social-icon" />
  
</Link>                    <FontAwesomeIcon icon={faFacebook} className="application-social-icon" />
<Link to="https://www.instagram.com/resourzone?igsh=MTNqZGQ3dHc2MDN4OA==">
                      <FontAwesomeIcon icon={faInstagram} className="application-social-icon" />
  
</Link>                    <FontAwesomeIcon icon={faXTwitter} className="application-social-icon" />
                  </div>
                </div>
              </div>
            </Col>

            <Col md={8} className="application-form-container">
              <p className='application-head'>Explore Exciting Career Opportunities with Us</p>
              <p className='application-subhead'>Complete the form below:</p>
              <Form className='application-forme' onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="application-input-with-icon">
                  <FontAwesomeIcon icon={faUser} className="application-input-icon" />
                  <Form.Control 
                    type="text" 
                    placeholder="Name" 
                    className="application-icon-input" 
                    name="Name" 
                    value={formData.Name} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="application-input-with-icon mt-3">
                  <FontAwesomeIcon icon={faEnvelope} className="application-input-icon" />
                  <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    className="application-icon-input" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <Form.Group controlId="formPosition" className="mt-3">
                  <Form.Control 
                    as="select" 
                    className="application-icon-input" 
                    name="job_position" 
                    value={formData.job_position} 
                    onChange={handleChange}
                  >
                    <option value="">Select Position</option>
                    {jobTitles.map((title, index) => (
                      <option key={index} value={title}>{title}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formCV" className="mt-3 position-relative">
  <div className="custom-file-upload">
    {cvName ? (
      <span className="cv-file-name">{cvName}</span>
    ) : (
      <span className="custom-file-placeholder">
        Upload CV (PDF only, max 2MB)
      </span>
    )}
    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
    <Form.Control
      type="file"
      className="application-file-input"
      onChange={handleFileChange}
      accept=".pdf"
    />
  </div>
</Form.Group>

                <Form.Group controlId="formMessage" className="mt-3">
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    placeholder="Your Message" 
                    className="application-icon-input" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <button type="submit" className="mt-4 application-button" disabled={isLoading}>
              {isLoading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Submit'
              )}
            </button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Application;
