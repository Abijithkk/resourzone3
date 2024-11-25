import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './Note.css';

function Note() {
  const controls = useAnimation();
  const noteRef = useRef(null);

  useEffect(() => {
    const currentRef = noteRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start('visible');
          } else {
            controls.start('hidden');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <div ref={noteRef} className="note-container">
      <motion.div className="note-content" initial="hidden" animate={controls}>
        <motion.h2 className="notehead" variants={textVariant} custom={1}>
          A Note From Our CEO
        </motion.h2>
        <motion.p className="notepara" variants={textVariant} custom={2}>
        It has been inspiring to witness Qatar's extraordinary economic transformation over recent years. As one of the 
world’s fastest-growing economies, Qatar is marked by dynamic markets, rapid infrastructure advancements, 
and a forward-thinking approach to development. This country is blessed not only with abundant natural 
resources but also with visionary leadership that has crafted a clear path for sustainable growth and social 
progress, as outlined in the Qatar National Vision 2030. <br /><br />

At ResourZone Consultancy & Services, we are committed to contributing to this promising future by 
empowering businesses with strategic, high-quality HR solutions designed to enhance performance, ensure 
compliance, and drive sustainable success in Qatar’s vibrant market. Our comprehensive range of HR services—
from HR planning, talent acquisition, performance management, payroll management, SOP and policy 
development, training and development, to HR software solutions, legal advisory, and strategic partnerships—is 
tailored to meet the unique needs of each organization and foster its long-term growth. <br /><br />

We believe HR is a cornerstone of organizational strength. Leveraging our expertise in Qatar’s labor laws and 
best practices, we design custom solutions that enhance workforce management, nurture employee well-being, 
and build resilience. Our strategic approach is grounded in promoting both organizational success and the overall 
health and well-being of people, enabling businesses to thrive in a fast-changing environment. <br /><br />

Additionally, our CADPRO division operates as a separate entity, offering specialized engineering support 
services—including precise CAD drafting and surveying solutions—for a diverse range of construction and 
industry projects throughout Qatar. <br /><br />

We assure you of our utmost dedication to delivering uniquely tailored services that drive sustainable and lasting 
success for your organization. Thank you for trusting ResourZone as your HR partner in Qatar. We look forward 
to helping your organization achieve its full potential and contribute to the nation’s success story.   
        </motion.p>
        <motion.p className="notebottom" variants={textVariant} custom={3}>
          - Shaji Kanakkanath, CEO
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Note;
