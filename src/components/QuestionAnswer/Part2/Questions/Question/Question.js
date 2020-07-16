import React, { Component } from 'react';

import './Question.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import draftToHtml from 'draftjs-to-html';
import Answers from './Answers';
class Question extends Component {
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
      <div className='question'>
        <div className='detail'>
          <h4 className='title'>{this.props.title}</h4>
          <h3
            className='description'
            dangerouslySetInnerHTML={{
              __html: draftToHtml(JSON.parse(this.props.description)),
            }}
          ></h3>
          <div className='tags'>
            <div className='tag-q'>business</div>
            <div className='tag-q'>Science</div>
          </div>
          <p>
            <b>{this.props.askedBy.username}</b> Asked on {this.props.date}
          </p>
          <p>
            {/* <b>
							View all <i className="fa fa-arrow-right"></i>
						</b> */}
            <button
              onClick={this.onOpenModal}
              className='btn btn-outline-info rounded-0'
            >
              {' '}
              Enter your Answer/View all Answers!{' '}
              <i className='fa fa-arrow-right'></i>
            </button>
            <Answers
              flag={this.state.open}
              close={this.onCloseModal}
              answers={this.props.answers}
              id={this.props.id}
            />
          </p>
        </div>
        <div className='info'>
          <div className='sub'>
            <p>100</p>views
          </div>
          <div className='sub'>
            <p>{this.props.totalanswers}</p>answers
          </div>
          <div className='sub'>
            <p>1</p>votes
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
