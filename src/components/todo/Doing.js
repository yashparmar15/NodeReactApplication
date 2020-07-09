import React from 'react';
import DoingItem from './DoingItem';
import AddDoing from './AddDoing';

class Doing extends React.Component {
  state = {
    addModalShow: false,
  };

  onHide = () => {
    this.setState({ addModalShow: false });
  };

  render() {
    return (
      <div className='card border-warning mb-3 text-center'>
        <div className='card-header bg-warning font'>Doing</div>
        <div className='card-body text-warning'>
          <button
            type='button'
            className='btn btn-dark'
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Task
          </button>
          <AddDoing
            show={this.state.addModalShow}
            onHide={this.onHide}
            addDoing={this.props.addDoing}
          />
          {this.props.doings.map((doing) => {
            return (
              <DoingItem
                key={doing.id}
                doing={doing}
                laterdoing={this.props.laterdoing}
                donetodo={this.props.donetodo}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Doing;
