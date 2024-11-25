import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Hrm from './Pages/Hrm';
import Career from './Pages/Career';
import Header from './components/Header';
import Footer from './components/Footer';
import Footerbottom from './components/Footerbottom';
import Enquiry from './Pages/Enquiry';
import Application from './Pages/Application';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Dashboard from './Pages/Dashboard'; 
import Login from './Pages/Login';
import Users from './Pages/Users';
import { Commet } from 'react-loading-indicators';
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute '; // Adjust the import path as necessary
import Enquiry2 from './Pages/Enquiry2';

function App() {
  const location = useLocation();

  // Admin pages and pages without Header/Footer
  const isAdminPage = ['/dashboard', '/users', '/enquiries'].includes(location.pathname.toLowerCase());
  const isNoHeaderFooterPage = ['/enquiry', '/application', '/','/dashboard', '/users', '/enquiries','/login'].includes(location.pathname.toLowerCase());

  // Determine if Header/Footer/Footerbottom should be shown
  const showHeaderFooter = !isAdminPage && !isNoHeaderFooterPage;

  const [loading, setLoading] = useState(location.pathname !== '/');

  useEffect(() => {
    if (location.pathname !== '/') {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      {loading ? (
        <div className="loader-container">
          <Commet color="#22CC9D" size="medium" text="" textColor="" />
        </div>
      ) : (
        <>
          {/* Render Header only when needed */}
          {showHeaderFooter && <Header />}
          <div className="content">
            <Routes>
              {/* User-Side Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/hrm" element={<Hrm />} />
              <Route path="/career" element={<Career />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/application" element={<Application />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Admin-Side Routes */}
              <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute component={Dashboard} />
          }
        />             
        
        <Route 
          path='/users' 
          element={
            <ProtectedRoute component={Users} />
          }
        />
 <Route 
          path='/enquiries' 
          element={
            <ProtectedRoute component={Enquiry2} />
          }
        />              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          {/* Render Footer and Footerbottom only when needed */}
          {showHeaderFooter && <Footer />}
          {showHeaderFooter && <Footerbottom />}
        </>
      )}
    </div>
  );
}

export default App;


