import React, { Component } from 'react';
import Todo from '../../components/todo/Todo';
import Doing from '../../components/todo/Doing';
import Done from '../../components/todo/Done';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import {connect} from 'react-redux';

import './ToDoMain.css';

class ToDoMain extends Component {
  state = {
    cur_user : {},
    todos: [
      
    ],
    doings: [
    ],
    dones: [],
  };

  componentDidMount = () =>{
    var Cur ;
    this.props.users.usersData.map(U => {
      if(U.id === this.props.user.userData._id)
        Cur = U;
    })
    this.setState({cur_user : Cur});
    this.setState({todos : Cur.todo});
    this.setState({doings : Cur.doing});
    this.setState({dones : Cur.done});
  }

  delTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };

  addTodo = (task, description) => {
    const newtodo = {
      task: task,
      description: description,
    };
    var updatedtodo = [...this.state.todos]
    updatedtodo.push(newtodo);
    const C = {
      ...this.state.cur_user,
      todo : updatedtodo,
    }

    axios.post('http://localhost:5000/user/addtodo',{C}).then(res => {
          this.setState({cur_user : C});
          this.setState({todos : C.todo})  
    })
    // this.setState({ todos: [...this.state.todos, newtodo] });
  };

  addDoing = (task, description) => {
    const newdoing = {
      task: task,
      description: description,
    };
    var updateddoing = [...this.state.doings]
    updateddoing.push(newdoing);
    const C = {
      ...this.state.cur_user,
      doing : updateddoing,
    }

    axios.post('http://localhost:5000/user/adddoing',{C}).then(res => {
          this.setState({cur_user : C});
          this.setState({doings : C.doing})  
    })
  };

  addDone = (task, description) => {
    const newdone = {
      task: task,
      description: description,
    };
    var updateddone = [...this.state.dones]
    updateddone.push(newdone);
    const C = {
      ...this.state.cur_user,
      done : updateddone,
    }

    axios.post('http://localhost:5000/user/adddone',{C}).then(res => {
          this.setState({cur_user : C});
          this.setState({dones : C.done})  
    })
  };

  deldone = (id) => {
    this.setState({
      dones: [...this.state.dones.filter((done) => done.id !== id)],
    });
  };

  laterdoing = (id) => {
    const x = this.state.doings.filter((doing) => doing.id === id);

    const laterdoing = {
      id: x[0].id,
      task: x[0].task,
      description: x[0].description,
    };
    this.setState({ todos: [...this.state.todos, laterdoing] });
    this.setState({
      doings: [...this.state.doings.filter((doing) => doing.id !== id)],
    });
  };

  laterdone = (id) => {
    const x = this.state.dones.filter((done) => done.id === id);

    const latertodo = {
      id: x[0].id,
      task: x[0].task,
      description: x[0].description,
    };
    this.setState({ todos: [...this.state.todos, latertodo] });
    this.setState({
      dones: [...this.state.dones.filter((done) => done.id !== id)],
    });
  };

  letsdo = (id) => {
    const x = this.state.todos.filter((todo) => todo.id === id);

    const letsdo = {
      id: x[0].id,
      task: x[0].task,
      description: x[0].description,
    };
    this.setState({ doings: [...this.state.doings, letsdo] });
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };

  donetodo = (id) => {
    const x = this.state.doings.filter((doing) => doing.id === id);

    const done = {
      id: x[0].id,
      task: x[0].task,
      description: x[0].description,
    };
    this.setState({ dones: [...this.state.dones, done] });
    this.setState({
      doings: [...this.state.doings.filter((doing) => doing.id !== id)],
    });
  };

  render() {
    return (
      <div className='entire-todo pd-5'>
        <div className='center'>
          <div className='text-background-todolist'>
            <h2 className='text-center text-white'>Make Your Todo List!</h2>
          </div>
          <div className='row container mx-auto mt-5'>
            <div className='col-lg-4 mb-5'>
              <Todo
                // style={style}
                todos={this.state.todos}
                addTodo={this.addTodo}
                delTodo={this.delTodo}
                letsdo={this.letsdo}
              />
            </div>
            <div className='col-lg-4 mb-5'>
              <Doing
                // style={style}
                doings={this.state.doings}
                addDoing={this.addDoing}
                laterdoing={this.laterdoing}
                donetodo={this.donetodo}
              />
            </div>
            <div className='col-lg-4 mb-5'>
              <Done
                // style={style}
                dones={this.state.dones}
                addDone={this.addDone}
                laterdone={this.laterdone}
                deldone={this.deldone}
              />
            </div>
          </div>
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

export default connect(mapStateToProps)(ToDoMain);
