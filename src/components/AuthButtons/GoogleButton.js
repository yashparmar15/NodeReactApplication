import React from 'react';

const GoogleButton = () => {
  return (
    <div className=''>
      <a href='/auth/google'>
        <button className='btn btn-social btn-google mt-3' type='submit'>
          <i className='fab fa-google google-logo'></i>
          <span className='google-text'>Google</span>
        </button>
      </a>
    </div>
  );
};

export default GoogleButton;
