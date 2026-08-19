import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page container section">
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn btn--primary">Back to Home</Link>
  </div>
);

export default NotFound;
