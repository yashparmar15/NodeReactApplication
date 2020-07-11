import React from 'react';

import GoogleButton from '../AuthButtons/GoogleButton';
import GithubButton from '../AuthButtons/GithubButton';
import './LoginModal.css';
const LoginModal = () => {
  return (
    <>
      <button
        type='button'
        class='btn btn-primary'
        data-toggle='modal'
        data-target='#loginModal'
      >
        <i className='fas fa-sign-in-alt'></i> Sign Up!
      </button>

      <div
        class='modal fade'
        id='loginModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog modal-dialog-login'>
          <div class='modal-content modal-login-content'>
            <div class='modal-header modal-login-header'>
              <h5 class='modal-title modal-login-title' id='exampleModalLabel'>
                <i class='fas fa-sign-in-alt mr-2'></i> Sign Up!
              </h5>
              <button
                type='button'
                class='close cross-login-modal'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div class='modal-body modal-login-body'>
              <div className='all-buttons'>
                <GithubButton />
                <GoogleButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
