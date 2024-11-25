import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Services.css';
import service1 from '../images/service1.png';
import service2 from '../images/service2.png';
import service3 from '../images/service3.png';
import service4 from '../images/service4.png';
import service5 from '../images/service5.png';
import service6 from '../images/service6.png';
import service7 from '../images/service7.png';
import service8 from '../images/service8.png';
import service9 from '../images/service9.png';
import service10 from '../images/service10.png';

import { FaInfoCircle } from 'react-icons/fa'; // import an icon of your choice

function Services() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const servicesContainerRef = useRef(null);
    const headingContainerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

   
    const servicesData = [
        { image: service1, title: 'CV Sourcing & Recruitment', description: 'We connect your business with the best talent through precise sourcing, screening, and recruitment processes tailored to your unique needs.' },
        { image: service2, title: 'Overseas Recruitment Support', description: 'We assist with all mandatory in-country preparatory procedures and connect Qatari companies with credible recruitment agencies in countries like India, Nepal, Bangladesh, Sri Lanka, the Philippines, Thailand, Kenya, and more, ensuring a seamless and efficient recruitment experience.' },
        { image: service3, title: 'Payroll Management', description: 'Our payroll management service ensures efficient and compliant payroll processing, freeing your business from administrative burdens and ensuring alignment with Qatar’s labor laws.' },
        { image: service4, title: 'HR Department Setup', description: 'We help businesses build robust HR departments, developing customized policies, procedures, and SOPs that comply with Qatar’s regulatory standards and your business strategies and goals.' },
        { image: service5, title: 'Supply of Skilled Professionals & Office Staff', description: 'Whether you need temporary or permanent staff, we supply skilled professionals and office personnel to match your project needs.' },
        { image: service6, title: 'HR Information Management Software Solutions', description: 'We provide expert consultancy to develop or customize user-friendly HRIM software tailored to your business requirements, enhancing your HR operations and decision-making processes.' },
        { image: service7, title: 'HR Reports Development & Customization', description: 'We design and customize valuable HR reports—daily, weekly, monthly, quarterly, and annually—that provide critical insights into your company’s performance, enabling strategic decision-making for continuous growth.' },
        { image: service8, title: 'Strategic HR Business Partnership', description: 'As your strategic HR business partner, ResourZone collaborates closely with your organization, offering tailored HR strategies that align with your business objectives and drive growth, efficiency, and operational excellence.' },
        { image: service9, title: 'Legal Advisory on Qatar Labour and Commercial Laws', description: 'We provide timely consultancy and expert advice on Qatar Labour Law and relevant commercial law changes and amendments, ensuring your business stays compliant and up-to-date with the latest legal requirements.' },
        { image: service10, title: 'Empowering Your Vision with Expert Business Plans', description: 'We provide comprehensive business planning and consulting solutions for small and medium-sized businesses in Qatar. Our services include customized business plans, feasibility studies, risk analysis, and execution plans with clear timelines and KPIs to ensure successful project implementation. We also offer financial planning, regulatory compliance support, and strategic tools like the Business Model Canvas for a clear business overview. Additionally, we assist with market entry strategies, scalable growth solutions, and performance monitoring, helping businesses thrive and achieve sustainable success in Qatar’s dynamic market.' },

    ];
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

    
    const handleScroll = () => {
        const container = servicesContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const progress = (scrollLeft / maxScrollLeft) * 100;
        setScrollProgress(progress);
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

    useEffect(() => {
        const observedElement = headingContainerRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsInView(entry.isIntersecting);
                });
            },
            { threshold: 0.5 }
        );

        if (observedElement) {
            observer.observe(observedElement);
        }

        return () => {
            if (observedElement) {
                observer.unobserve(observedElement);
            }
        };
    }, []);

    // Handle left and right scroll
    const scrollLeftButton = () => {
        servicesContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRightButton = () => {
        servicesContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div id="services">
            <motion.div
                className="services-container1"
                ref={headingContainerRef}
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <p className="serviceheading">Our Services</p>
                <p className="servicesubheading">
                Customized HR Solutions  <br /> to Propel Your Business
                </p>
            </motion.div>
            <div className="services-wrapper">
                <button className="scroll-arrow left" onClick={scrollLeftButton}>
                <i class="fas fa-chevron-left"></i>
                </button>
                <div
                    className="services-container2"
                    ref={servicesContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                   {servicesData.map((service, index) => {
                const isTruncated = service.description.length > 200;

                return (
                    <div key={index} className={`service-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
                        <div className="image-container">
                            <img src={service.image} alt={service.title} />
                            <h3>{service.title}</h3>
                        </div>
                        <p>
                            {expanded[index]
                                ? service.description
                                : truncateText(service.description, 200)}
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
                    </div>
                );
            })}
                </div>
                <button className="scroll-arrow right" onClick={scrollRightButton}>
                <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div className="scroll-progress-bar">
                <div className="progress" style={{ width: `${scrollProgress}%` }} />
            </div>
        </div>
    );
}

export default Services;
