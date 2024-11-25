import React, { useEffect, useRef, useState } from 'react';
import About from './About';
import Whychoose from './Whychoose';
import Process from './Process';
import Testimonials from './Testimonials';
import Services from './Services';
import LandingPage from './Landingpage';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import Footerbottom from '../components/Footerbottom';
import logo from '../images/lOGO RESOURZONE.svg';
import './Home.css';

function Home() {
  const videoRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // Play video once splash screen disappears
    const video = videoRef.current;
    if (video) {
      video.play();
    }

    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);

  return (
    <div>
      <div className={`splash-screen ${!showSplash ? 'hidden' : ''}`}>
        <img src={logo} alt="Resourzone Logo" className="splash-logo" />
      </div>
      <div className={`home-content ${showSplash ? 'hidden' : ''}`}>
        <div className="landingheader">
          <video
            ref={videoRef}
            muted
            className="background-video"
            playsInline
            loop
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: '-1',
            }}
          >
<source src="/Resourzonevideo.webm" type="video/webm" />
</video>
          <Header2 />
          <LandingPage />
        </div>
        <About />
        <Services />
        <Whychoose />
        <Process />
        <Testimonials />
        <Footer />
        <Footerbottom />
      </div>
    </div>
  );
}

export default Home;
