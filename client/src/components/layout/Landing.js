import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='containers'>
      <div className='card'>
        <div>
          <Link to='/login'>
            <button className='landing-button'>Login</button>
          </Link>
          <br />
          <br />
          <Link to='/register'>
            <button className='landing-button'>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
