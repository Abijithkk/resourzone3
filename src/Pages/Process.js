import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Process.css';
import pr1 from '../images/18be7322db86242ae5f07e86e01d1c2e.png';
import pr2 from '../images/pr2.png';
import pr3 from '../images/pr3.png';
import pr4 from '../images/pr4.png';
import leftvector from '../images/Vector 1 (1).png';
import rightvector from '../images/Vector 2.png';

const Process = () => {
  // Define animation variants for left and right sliding
  const leftVariants = {
    hidden: { opacity: 0, x: -50 }, // Start off-screen left
    visible: { opacity: 1, x: 0 },   // Slide in to original position
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 }, // Start off-screen right
    visible: { opacity: 1, x: 0 },  // Slide in to original position
  };

  // Use Intersection Observer for visibility detection
  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <div className="process-container">
      <div className="process-header">
        <p className="process-title">Our Process</p>
        <p className="process-subtitle">How We Deliver Excellence</p>
        <p className="process-description">
          Our structured approach is designed to ensure that our services align seamlessly
          with your business needs and deliver meaningful results:
        </p>
      </div>

      {/* First Row - Image and Text on the left */}
      <motion.div
        ref={ref1}
        className="process-row left-align"
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={leftVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="process-content">
          <div className="process-image">
            <img src={pr1} alt="Process Illustration" />
          </div>
          <div>
            <span className="process-text-heading">Consultation</span>
            <p className="process-text">
              We begin by engaging with you to thoroughly understand your unique
              business challenges and objectives.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="left-vector-container">
        <img src={leftvector} alt="" />
      </div>

      {/* Second Row - Image and Text on the right */}
      <motion.div
        ref={ref2}
        className="process-row right-align"
        initial="hidden"
        animate={inView2 ? "visible" : "hidden"}
        variants={rightVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="process-content">
          <div className="process-image">
            <img src={pr2} alt="Another Process Illustration" />
          </div>
          <div>
            <span className="process-text-heading">Strategy Development</span>
            <p className="process-text">
              We develop customized HR solutions, including legal
              advisory and strategic partnerships, tailored to your specific needs.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="right-vector-container">
        <img src={rightvector} alt="" />
      </div>

      {/* Third Row - Image and Text on the left */}
      <motion.div
        ref={ref3}
        className="process-row left-align"
        initial="hidden"
        animate={inView3 ? "visible" : "hidden"}
        variants={leftVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="process-content">
          <div className="process-image">
            <img src={pr3} alt="Process Illustration" />
          </div>
          <div>
            <span className="process-text-heading">Implementation</span>
            <p className="process-text">
              Our skilled team executes these solutions effectively and precisely,
              ensuring smooth integration into your operations.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="left-vector-container">
        <img src={leftvector} alt="" />
      </div>

      {/* Fourth Row - Image and Text on the right */}
      <motion.div
        ref={ref4}
        className="process-row right-align"
        initial="hidden"
        animate={inView4 ? "visible" : "hidden"}
        variants={rightVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="process-content">
          <div className="process-image">
            <img src={pr4} alt="Another Process Illustration" />
          </div>
          <div>
            <span className="process-text-heading">Ongoing Support</span>
            <p className="process-text">
              We offer continuous support to fine-tune your HR functions and
              ensure compliance with evolving regulations, keeping your business on the cutting
              edge.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Process;
