import React from 'react';
import { Link } from 'react-router-dom';
import './Footerbottom.css';

function Footerbottom() {
  return (
    <div className="footer-bottom">
      <div className="footer-bottom-text text-center">
        <span>© 2008 - 2019 | All Rights Reserved</span>
        <Link className="footer-link" to='/privacy'>Privacy Policy</Link>
        <Link className="footer-link" to='/terms'>Terms and Conditions</Link>
      </div>
    </div>
  );
}

export default Footerbottom;
