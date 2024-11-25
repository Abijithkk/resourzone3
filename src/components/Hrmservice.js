import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import './hrmservice.css';
import service1 from '../images/hrmservice1.png';
import service2 from '../images/hrmservice2.png';
import service3 from '../images/hrmservice3.png';
import service4 from '../images/hrmservice4.png';
import service5 from '../images/hrmservice5.png';
import service6 from '../images/hrmservice6.png';
import service7 from '../images/hrmservice7.png';
import service8 from '../images/hrmservice8.png';
import service9 from '../images/hrmservice9.png';
import service10 from '../images/hrmservice10.png';
import { FaInfoCircle } from 'react-icons/fa';

function Hrmservices() {
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const servicesData = [
    { image: service1, title: 'HR Strategy Development', description: 'We collaborate closely with our clients to design an HR strategy tailored to their organization’s objectives in Qatar, considering the country’s distinct business landscape and cultural nuances. Our approach involves identifying critical HR priorities, formulating detailed action plans, and executing strategies that drive business growth and success in Qatar. In a dynamic and forward-thinking nation like Qatar, leading in human resource management is essential. Rely on our HR Consultancy Firm in Qatar to keep your business ahead of the curve.' },
    { image: service2, title: 'Talent Management', description: 'Our HR consultancy focuses not only on identifying talent but also on fostering its development and growth. Understanding the diverse requirements of Qatar’s corporate environment, we create programmes that enhance employee engagement and support ongoing professional development. Through bespoke career pathing options, our ervices ensure high levels of talent retention, offering employees a clear and rewarding progression pathway. By combining local insights with global best practices, our HR Consultancy in Qatar is committed to cultivating growth, innovation, and efficiency within your organization.' },
    { image: service3, title: 'Performance Management', description: 'We support organizations in Qatar by designing and implementing performance management systems that foster employee development and drive results tailored to the local context. Our services include establishing performance metrics and evaluation criteria, delivering training on effective performance management techniques, and instituting robust performance appraisal processes. In our HR consultancy approach, performance is viewed as a synergy between personal development and organizational success. By customizing performance metrics to suit Qatar’s corporate landscape, we provide a clear pathway for employee growth. Our training further enhances the appraisal process, transforming it into a driver of progress and tangible outcomes. With extensive experience as a trusted HR Consultancy in Qatar, we are well-equipped to tackle both industry-specific and broader HR challenges your organization may encounter.' },
    { image: service4, title: 'Competency Models', description: 'We assist our clients in Qatar in identifying and developing the key competencies required for success within their industry and the local market. This involves creating and deploying assessment tools and training programmes to equip employees with the skills and knowledge needed to thrive in their roles. Building a resilient and adaptable organisation in Qatar demands an in-depth understanding of the local HR landscape—an area in which our HR Consultancy firm excels.' },
    { image: service5, title: 'HR Policy', description: 'We assist our clients in Qatar in crafting and implementing HR policies and procedures that are aligned with their business objectives, local laws and regulations, and the country’s unique cultural and social dynamics. Our services include reviewing and updating existing policies, creating new ones as required, and offering expert guidance on legal compliance. We also work closely with organizations to ensure that their HR policies foster a positive and inclusive work environment that reflects the company’s values andculture. Additionally, we provide training and support to managers and employees, ensuring  they fully understand and adhere to these policies. Our commitment to integrating the values and aspirations of the Qatari workforce sets us apart as a leading HR Consultancy in Qatar.' },
    { image: service6, title: 'Employee Assessments', description: 'We support organisations in Qatar in designing and implementing employee assessments that accurately evaluate the skills and knowledge of their workforce. These assessments play a crucial role in talent management, employee development, and succession planning. In Qatar’s diverse talent landscape, precise employee assessments are essential for creating well-balanced and high-performing teams. Our HR Consultancy in Qatar utilises advanced tools and methodologies to ensure your talent is strategically positioned for maximum effectiveness.' },
    { image: service7, title: 'Job Evaluation and Grading', description: ' We support organisations in Qatar in developing job evaluation and grading systems that align with their business objectives, market trends, and local regulations. Our approach includes drafting job descriptions, evaluating roles, grading positions, and determining suitable compensation packages. Given the distinctive demands of the Qatari market, standard job evaluations often fall short. Our HR Consultancy in Qatar goes beyond the basics, ensuring that job roles and grades accurately reflect their value and responsibilities within the local context.' },
    { image: service8, title: 'Compensation and Benefits', description: 'We assist organisations in Qatar in designing and implementing competitive compensation and benefits programmes that align with market trends and regulations to attract and retain top talent. Our services include conducting salary surveys, analysing the competitiveness of compensation packages, and recommending necessary adjustments to ensure your organisation remains appealing to top talent. Qatar’s dynamic economic landscape calls for a robust and competitive compensation strategy. Our comprehensive HR Consultancy services ensure your offerings are not only attractive but also aligned with local economic trends.' },
    { image: service9, title: 'Expert Team', description: 'Our team of certified HR consultants, accredited by professional bodies such as CIPD and SHRM, bring extensive expertise in various HR disciplines. We offer bilingual services to cater to the diverse needs of organisations in Qatar.' },
    { image: service10, title: 'Client-Centric Approach', description: 'We work closely with our clients to understand their business objectives and tailor our solutions to meet their specific needs. Contact us today to arrange a consultation and discover how our HR Consultancy can help your organisation achieve its goals through effective human resource management. In Qatar’s thriving business environment, your greatest asset is your people. Trust our HR Consultancy Firm in Qatar to help you unlock this potential to its fullest.' },

  ];

  const handleScroll = () => {
    if (servicesContainerRef.current) {
      const scrollLeft = servicesContainerRef.current.scrollLeft;
      const scrollWidth = servicesContainerRef.current.scrollWidth;
      const clientWidth = servicesContainerRef.current.clientWidth;
      
      setIsScrolled(scrollLeft > 0 && scrollLeft < scrollWidth - clientWidth);

      const maxScrollLeft = scrollWidth - clientWidth;
      const progress = (scrollLeft / maxScrollLeft) * 100;
      setScrollProgress(progress);
    }
  };
  const [expanded, setExpanded] = useState({});

    const toggleDescription = (index) => {
        setExpanded((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const truncateText = (text, limit) => {
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - servicesContainerRef.current.offsetLeft);
    setScrollLeft(servicesContainerRef.current.scrollLeft);
};

const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - servicesContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    servicesContainerRef.current.scrollLeft = scrollLeft - walk;
};

const handleMouseUpOrLeave = () => {
    setIsDragging(false);
};

// Handle left and right scroll
const scrollLeftButton = () => {
  servicesContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
};

const scrollRightButton = () => {
  servicesContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
};

  useEffect(() => {
    const container = servicesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.6 }
    });
  }, [controls]);

  return (
    <div id="services">
      <motion.div
        className="hrm-services-container1"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <p className='hrm-serviceheading'>Our Services</p>
        {/* <p className='hrm-servicesubheading'>Earn HR credits while staying <br /> up-to-date on industry trends</p> */}
      </motion.div>

     <div className='services-wrapper'>
     <button className="hrm-scroll-arrow left" onClick={scrollLeftButton}>
                <i class="fas fa-chevron-left"></i>
                </button>
        <div
          className={`hrm-services-container2 ${isScrolled ? 'scrolled' : ''}`}
          ref={servicesContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
                   {servicesData.map((service, index) => {
         const isTruncated = service.description.length > 400;
                return (

            <motion.div
              key={index}
              className={`hrm-service-card ${index % 2 === 0 ? 'even' : 'odd'}`}
              initial={{ opacity: 0, y: index % 2 === 0 ? -10 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="hrm-image-container">
                <img src={service.image} alt={service.title} />
              </div>
              <h3 className='hrm-h3'>{service.title}</h3>
            <p>
                            {expanded[index]
                                ? service.description
                                : truncateText(service.description, 400)}
                            {isTruncated && (
                                <span
                                    className="view-more"
                                    onClick={() => toggleDescription(index)}
                                    style={{
                                        color: '#22CC9D',
                                        cursor: 'pointer',
                                        marginLeft: '0.5rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {expanded[index] ? 'View Less' : 'View More'}
                                </span>
                            )}
                            <Link
                                className="ms-3"
                                to="./enquiry"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    color: 'black',
                                    transition: 'color 0.3s ease',
                                }}
                                aria-label="Enquiry Information"
                            >
                                <FaInfoCircle
                                    style={{
                                        fontSize: '1.2rem',
                                        color: '#22CC9D',
                                        marginRight: '0.5rem',
                                        marginTop: '1%',
                                    }}
                                />
                            </Link>
                        </p>
            </motion.div>
        );
          })}
        </div>
        <button className="hrm-scroll-arrow right" onClick={scrollRightButton}>
                <i class="fas fa-chevron-right"></i>
                </button>
     </div>
      <div className="hrm-scroll-progress-bar">
        <div className="progress" style={{ width: `${scrollProgress}%` }} />
      </div>
    </div>
  );
}

export default Hrmservices;
