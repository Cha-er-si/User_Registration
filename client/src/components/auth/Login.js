import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='containers'>
      <div className='card'>
        <h1 className='title'>Login</h1>
        <div>
          <Link to='/login'>
            <button className='landing-button'>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
