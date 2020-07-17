import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';

import './Part1.css';
import AskQuestion from './AskQuestion/AskQuestion';
import LoginModal from '../../LoginModal/LoginModal';

class Part1 extends Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className='part1'>
        {this.props.user.isAuthenticated ? (
          <div>
            <button className='askButton' onClick={this.onOpenModal}>
              <i className='fa fa-p2 fa-plus' aria-hidden='true' /> ASK A
              QUESTION
            </button>
            <AskQuestion flag={this.state.open} close={this.onCloseModal} />
          </div>
        ) : (
          <div className=''>
            <h5 className='want-to'>Want to ask questions?</h5>
            <div className='login-modal-questions'>
              <LoginModal />
            </div>
          </div>
        )}
        <div className='category'>
          <button className='category-btn'>
            <i className='fa-p2 fa fa-question' aria-hidden='true' /> Questions
          </button>
          <button className='category-btn'>
            <i className='fa fa-p2 fa-tag' aria-hidden='true' /> Tags
          </button>
          <button className='category-btn'>
            <i className='fa fa-p2 fa-trophy' aria-hidden='true' /> Badges
          </button>
          <button className='category-btn'>
            <i className='fa fa-p2 fa-list-alt' aria-hidden='true' /> Categories
          </button>
          <button className='category-btn'>
            <i className='fa fa-p2 fa-users' aria-hidden='true' /> Users
          </button>
        </div>
        <div className='terms'>
          <p>
            ©2020 <br />
            <b>Terms & Privacy</b>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(Part1);
