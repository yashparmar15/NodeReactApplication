import React, { Component } from 'react';

class TodoItem extends Component {
  render() {
    const { _id, task, description } = this.props.todo;

    return (
      <div style={style}>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{task}</h5>
            <p className='card-text'>{description}</p>
            <div className='d-flex justify-content-around container'>
              <button
                className='btn btn-danger btn-md rounded-0'
                onClick={this.props.delTodo.bind(this, _id)}
              >
                Remove{' '}
                <span role='img' aria-label='todo'>
                  😞{' '}
                </span>
              </button>
              <button
                className='btn btn-warning btn-md rounded-0'
                onClick={this.props.letsdo.bind(this, _id)}
              >
                Let's Do!{' '}
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

// TodoItem.propTypes = {
// 	todo: Proptypes.object.isRequired,
// 	delTOdo: Proptypes.func.isRequired,
// };

const style = {
  marginTop: '10px',
};

export default TodoItem;
