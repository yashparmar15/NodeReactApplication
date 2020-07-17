import React, { Component } from 'react';

class DoingItem extends Component {
  render() {
    const { _id, task, description } = this.props.doing;

    return (
      <div style={style}>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{task}</h5>
            <p className='card-text'>{description}</p>
            <div className='d-flex justify-content-around container'>
              <button
                className='btn btn-primary btn-md rounded-0'
                onClick={this.props.laterdoing.bind(this, _id)}
              >
                Later{' '}
                <span role='img' aria-label='todo'>
                  😞{' '}
                </span>
              </button>
              <button
                className='btn btn-success btn-md rounded-0'
                onClick={this.props.donetodo.bind(this, _id)}
              >
                Done!{' '}
                <span role='img' aria-label='todo'>
                  🙂{' '}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// DoingItem.propTypes = {
// 	doing: Proptypes.object.isRequired,
// };

const style = {
  marginTop: '10px',
};

export default DoingItem;
