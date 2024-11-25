import React, { useEffect } from 'react';
import './Terms.css';

function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <p className="terms-heading">Terms & Conditions</p>

      <div className="terms-container">
        <div className="terms-content">
            <p className='terms1'>Effective Date: 01-11-2024</p>
            <p className='terms2'>Welcome to www.resourzone.com (“Website”), owned and operated by ResourZone Consultancy & Services LLC 
(“we,” “us,” “our,” or “ResourZone”). By accessing or using our Website, you agree to comply with and be bound 
by the following Terms & Conditions. If you do not agree, please do not use the Website.</p>
          <section>
            <h2>1. Services Provided</h2>
            <p>
            ResourZone offers HR consultancy services and engineering drafting services to companies in Qatar. Job 
applicants may also apply for positions through our Website. The information on this Website does not constitute 
a binding agreement and may be modified at any time without notice.            </p>
          </section>

          <section>
            <h2>2. Use of Website</h2>
            <p >
            Your access to and use of this Website must be lawful and in compliance with these Terms. Unauthorized use of 
            this Website, including unauthorized access to our servers or misuse of Website content, is strictly prohibited.
            </p>
          </section>

          <section>
            <h2>3. Intellectual Property</h2>
            <p>
            All content on this Website, including text, images, and logos, is the property of ResourZone unless stated 
            otherwise. Unauthorized reproduction, distribution, or use of content without our prior consent is prohibited.            </p>
          </section>

          <section>
            <h2>4. Limitation of Liability</h2>
            <p>
            ResourZone is not liable for any direct, indirect, or consequential damages arising from the use of this Website 
            or any errors or omissions in the content provided. Use of the Website is at your own risk.
            </p>
          </section>

          <section>
            <h2>5. Third-Party Links</h2>
            <p>
            Our Website may include links to third-party sites. ResourZone is not responsible for the content, policies, or practices of third-party websites and does not endorse or assume any liability for them.            </p>
          </section>

          <section>
            <h2>6. Data Protection</h2>
            <p>
            By using our Website, you consent to our collection and use of your information as described in our Privacy 
            Policy. We take reasonable measures to protect your personal information but cannot guarantee its security.
            </p>
          </section>

          <section>
            <h2>7. Modification of Terms</h2>
            <p>
            ResourZone may revise these Terms & Conditions at any time without notice. Your continued use of the Website 
            constitutes acceptance of any updated terms.            </p>
          </section>
          <section>
            <h2>8. Governing Law</h2>
            <p>
            These Terms & Conditions are governed by the laws of Qatar, and any disputes arising out of the use of this 
            Website shall be subject to the exclusive jurisdiction of the Qatari courts.            </p>
          </section>
          <section>
            <h2>9. Contact Us</h2>
            <p className="terms-contact-info">
            For any questions regarding these Terms & Conditions, please contact us at:

              <br />
              ResourZone Consultancy & Services LLC

              <br />
              Doha, Qatar
              <br />
              info@resourzone.com 
            </p>
          </section>
          <section>
            <p>© 2024 ResourZone Consultancy & Services LLC. All rights reserved.</p>
          </section>
          <section>
            <p>All content on this website, including text, images, logos, and graphics, is the exclusive property of ResourZone 
Consultancy & Services LLC and is protected under copyright law. ResourZone retains the right to modify this 
disclaimer at any time without prior notice. <br /> <br />
While ResourZone strives to ensure that the information and materials presented on this website are accurate 
and comprehensive, we do not accept liability for any errors or omissions. ResourZone shall not be liable for any 
claims or losses arising, directly or indirectly, from the use of the data or materials provided on this site. 
Additionally, we are not responsible for any damages or losses resulting from delays, defects, or omissions related 
to the services, information, or content available on this website, whether actual, alleged, consequential, or 
punitive. <br /> <br />
All content on this website, including any downloadable materials, is owned by ResourZone unless otherwise 
specified. Unauthorized access or use of this website for any illegal or unlawful purposes is strictly prohibited.</p>
          </section>


          <section>
            <p>© 2024 ResourZone Consultancy & Services LLC. All rights reserved.</p>
          </section>
        </div>
      </div>
      
    </div>
  );
}

export default Terms;
