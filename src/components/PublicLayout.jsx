import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = () => (
  <div className="site">
    <Navbar />
    <main className="site__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
