import React from 'react';
import TodoItem from './TodoItem';
// import Proptypes from "prop-types";
import AddTodo from './AddTodo';
import axios from "axios";
import {connect} from 'react-redux';

class Todo extends React.Component {
  state = {
    addModalShow: false,
    cur_user : [],
  };
  componentDidMount =()=>{
		var Cur;
		this.props.users.usersData.map(U =>{
			if(U.id === this.props.user.userData._id)
				Cur = U.todo;
		});
    this.setState({cur_user : Cur});
    // console.log(Cur);
	}
  onHide = () => {
    this.setState({ addModalShow: false });
  };

  render() {
    return (
      <div className='card border-primary mb-3 text-center rounded-0 doing-bg'>
        <h4 className='card-header bg-primary font text-white rounded-0'>
          Add Task!
        </h4>
        <div className='card-body text-primary' style = {{height : '400px' , overflowY : 'auto'}} >
          <button
            type='button'
            className='btn btn-success rounded-0'
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Task <i className='fas fa-plus'></i>
          </button>
          <AddTodo
            show={this.state.addModalShow}
            onHide={this.onHide}
            addTodo={this.props.addTodo}
          />
          {this.state.cur_user.map((todo) => {
            return (
              <TodoItem
                key={todo._id}
                todo={todo}
                delTodo={this.props.delTodo}
                letsdo={this.props.letsdo}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
	return {
	  user: state.auth,
	  users:state.user,
	};
};

export default connect(mapStateToProps)(Todo);
