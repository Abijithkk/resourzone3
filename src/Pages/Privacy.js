import React, { useEffect } from 'react';
import './privacy.css';

function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <p className="privacy-heading">Privacy Policy</p>

      <div className="privacy-container">
        <div className="privacy-content">
            <p className='privacy1'>Effective Date: 01-11-2024</p>
            <p className='privacy2'>This Privacy Policy explains how ResourZone Consultancy & Services LLC ("we," "us," or "our") collects, uses, and protects your information on our website, www.resourzone.com ("Website"). By using our Website, you consent to the practices described herein.</p>
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect personal information you provide, such as your name, email address, phone number, and company name. We also gather non-personal information automatically, like your IP address and browsing data.
            </p>
          </section>

          <section>
            <h2>2. Use of Your Information</h2>
            <ul className="privacy-list">
              <li>Provide and improve our services</li>
              <li>Respond to inquiries</li>
              <li>Send marketing communications</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>3. Disclosure of Your Information</h2>
            <p>
              We do not sell your personal information. We may share it with trusted partners who assist us in operating our Website, provided they maintain confidentiality. We may also disclose information when required by law.
            </p>
          </section>

          <section>
            <h2>4. Security</h2>
            <p>
              We implement reasonable measures to protect your personal information. However, no online transmission is entirely secure, and we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>
              You may have rights regarding your personal information, such as access, correction, or deletion. Contact us if you wish to exercise these rights.
            </p>
          </section>

          <section>
            <h2>6. Third-Party Links</h2>
            <p>
              Our Website may link to third-party sites. We are not responsible for their content or privacy practices.
            </p>
          </section>

          <section>
            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time to reflect changes in our practices.
            </p>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p className="contact-info">
              For questions or concerns about this Privacy Policy, contact us at:
              <br />
              ResourZone Consultancy & Services LLC
              <br />
              Doha, Qatar
              <br />
              info@resourzone.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
