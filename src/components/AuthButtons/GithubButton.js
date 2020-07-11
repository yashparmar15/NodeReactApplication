import React from 'react';

const GithubButton = () => {
  return (
    <div>
      <a href='/auth/github'>
        <button className='btn btn-social btn-github' type='submit'>
          <i className='fab fa-github github-logo'></i>{' '}
          <span className='github-text'>GitHub</span>
        </button>
      </a>
    </div>
  );
};

export default GithubButton;
