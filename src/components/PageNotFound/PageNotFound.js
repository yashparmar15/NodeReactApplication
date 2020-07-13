import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import './PageNotFound.css';

const pageNotFound = (props) => (
  <div id='notfound'>
    <div className='notfound-bg'></div>
    <div className='notfound'>
      <div className='notfound-404'>
        <h1>404</h1>
      </div>
      <h2>Oops! Page Not Found</h2>
      <form className='notfound-search'>
        <input type='text' placeholder='Search...' />
        <button type='button'>Search</button>
      </form>
      <div className='notfound-social'>
        <a href='https://github.com/'>
          <i className='fab fa-facebook' aria-hidden='true'>
            {' '}
          </i>
        </a>
        <a href='https://github.com/'>
          <i className='fab fa-instagram' aria-hidden='true'></i>
        </a>
        <a href='https://github.com/'>
          <i className='fab fa-twitter'></i>
        </a>
        <a href='https://github.com/'>
          <i className='fa fa-envelope'></i>
        </a>
      </div>
      <a href='/'>Back To Homepage</a>
    </div>
  </div>
);

export default pageNotFound;
