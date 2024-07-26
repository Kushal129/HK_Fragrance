// consent use thato hoi all page ma same batavanu hoi contnet tena mate use thai.
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      {/* navbar and footer same rese */}
      <Navbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
