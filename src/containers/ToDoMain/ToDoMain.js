import React, { Component } from 'react';
import Todo from '../../components/todo/Todo';
import Doing from '../../components/todo/Doing';
import Done from '../../components/todo/Done';
import { v4 as uuidv4 } from 'uuid';

import './ToDoMain.css';

class ToDoMain extends Component {
  state = {
    todos: [
      { id: uuidv4(), task: 'kya kr rha', description: 'Bs kuch khas nhi' },
      {
        id: uuidv4(),
        task: 'kuch nhi  kr rha',
        description: 'Bs kuch khas nhi',
      },
    ],
    doings: [
      {
        id: uuidv4(),
        task: 'velle h bc kya kre 3 bje rat ko',
        description: 'Chup sale',
      },
    ],
    dones: [],
  };

  delTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };

  addTodo = (task, description) => {
    const newtodo = {
      id: uuidv4(),
      task: task,
      description: description,
    };

    this.setState({ todos: [...this.state.todos, newtodo] });
  };

  addDoing = (task, description) => {
    const newtodo = {
      id: uuidv4(),
      task: task,
      description: description,
    };

    this.setState({ doings: [...this.state.doings, newtodo] });
  };

  addDone = (task, description) => {
    console.log(task);
    const newtodo = {
      id: uuidv4(),
      task: task,
      description: description,
    };

    this.setState({ dones: [...this.state.dones, newtodo] });
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

// const style = {
//   width: '30%',
// };

export default ToDoMain;
