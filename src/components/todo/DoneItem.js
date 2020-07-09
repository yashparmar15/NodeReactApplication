import React, { Component } from 'react';
import Proptypes from 'prop-types';

class DoneItem extends Component {
  render() {
    const { id, task, description } = this.props.done;
    // console.log(description);
    return (
      <div style={style}>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{task}</h5>
            <p className='card-text'>{description}</p>
            <div className=' d-flex justify-content-around container'>
              <button
                className='btn btn-primary btn-md rounded-0'
                onClick={this.props.laterdone.bind(this, id)}
              >
                Later{' '}
                <span role='img' aria-label='todo'>
                  😞{' '}
                </span>
              </button>
              <button
                className='btn btn-success btn-md rounded-0'
                onClick={this.props.deldone.bind(this, id)}
              >
                Remove!{' '}
                <span role='img' aria-label='todo'>
                  😃{' '}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// DoneItem.propTypes = {
// 	// todo: Proptypes.object.isRequired,
// 	// delTOdo: Proptypes.func.isRequired,
// };

const style = {
  marginTop: '10px',
};

export default DoneItem;
