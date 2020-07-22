import React, { Component } from 'react';
import Todo from '../../components/todo/Todo';
import Doing from '../../components/todo/Doing';
import Done from '../../components/todo/Done';
import axios from 'axios';

import { connect } from 'react-redux';

import './ToDoMain.css';

class ToDoMain extends Component {
  state = {
    cur_user: {},
    todos: [],
    doings: [],
    dones: [],
  };

  componentDidMount = () => {
    var Cur;

    const path = window.location.pathname;
    const proid = path.substr(14,24);
    if(proid.length !== 24)
      window.location = '/404'
    if(proid === this.props.user.userData._id){
    axios.get("http://localhost:5000/user/getuserdata",{
      params : {
        id : proid
      }
    }).then((res) => {
        if(res.data){
          this.setState({ cur_user: res.data });
          this.setState({ todos: res.data.todo });
          this.setState({ doings: res.data.doing });
          this.setState({ dones: res.data.done });
        } else {
          window.location = '/404'
        }
    });
  }

  };

  delTodo = (id) => {
    // console.log(id)
    const tod = [...this.state.todos.filter((todo) => todo._id !== id)];
    const C = {
      ...this.state.cur_user,
      todo: tod,
    };
    // console.log(tod);
    axios.post('http://localhost:5000/user/addtodo', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ todos: C.todo });
    });
  };

  addTodo = (task, description) => {
    const newtodo = {
      task: task,
      description: description,
    };
    var updatedtodo = [...this.state.todos];
    updatedtodo.push(newtodo);
    const C = {
      ...this.state.cur_user,
      todo: updatedtodo,
    };

    axios.post('http://localhost:5000/user/addtodo', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ todos: C.todo });
    });
    // this.setState({ todos: [...this.state.todos, newtodo] });
  };

  addDoing = (task, description) => {
    const newdoing = {
      task: task,
      description: description,
    };
    var updateddoing = [...this.state.doings];
    updateddoing.push(newdoing);
    const C = {
      ...this.state.cur_user,
      doing: updateddoing,
    };

    axios.post('http://localhost:5000/user/adddoing', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ doings: C.doing });
    });
  };

  addDone = (task, description) => {
    const newdone = {
      task: task,
      description: description,
    };
    var updateddone = [...this.state.dones];
    updateddone.push(newdone);
    const C = {
      ...this.state.cur_user,
      done: updateddone,
    };

    axios.post('http://localhost:5000/user/adddone', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ dones: C.done });
    });
  };

  deldone = (id) => {
    const tod = [...this.state.dones.filter((todo) => todo._id !== id)];
    const C = {
      ...this.state.cur_user,
      done: tod,
    };
    // console.log(tod);
    axios.post('http://localhost:5000/user/adddone', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ dones: C.done });
    });
  };

  laterdoing = (id) => {
    const x = this.state.doings.filter((doing) => doing._id === id);
    const laterdoing = {
      _id: x[0]._id,
      task: x[0].task,
      description: x[0].description,
    };
    const tod = [...this.state.todos];
    tod.push(laterdoing);
    // console.log(tod);

    const doi = [...this.state.doings.filter((doing) => doing._id !== id)];
    var C = {
      ...this.state.cur_user,
      todo: tod,
    };
    this.setState({ todos: C.todo });
    axios.post('http://localhost:5000/user/addtodo', { C }).then((res) => {
      this.setState({ cur_user: C });
      // this.setState({todos : C.todo})
    });
    C = {
      ...this.state.cur_user,
      doing: doi,
    };
    axios.post('http://localhost:5000/user/adddoing', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ doings: C.doing });
    });
  };

  laterdone = (id) => {
    const x = this.state.dones.filter((doing) => doing._id === id);
    const laterdoing = {
      _id: x[0]._id,
      task: x[0].task,
      description: x[0].description,
    };
    const tod = [...this.state.todos];
    tod.push(laterdoing);
    // console.log(tod);

    const doi = [...this.state.dones.filter((doing) => doing._id !== id)];
    var C = {
      ...this.state.cur_user,
      todo: tod,
    };
    this.setState({ todos: C.todo });
    axios.post('http://localhost:5000/user/addtodo', { C }).then((res) => {
      this.setState({ cur_user: C });
      // this.setState({todos : C.todo})
    });

    C = {
      ...this.state.cur_user,
      done: doi,
    };
    axios.post('http://localhost:5000/user/adddone', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ dones: C.done });
    });
  };

  letsdo = (id) => {
    const x = this.state.todos.filter((doing) => doing._id === id);
    const laterdoing = {
      _id: x[0]._id,
      task: x[0].task,
      description: x[0].description,
    };
    const tod = [...this.state.doings];
    tod.push(laterdoing);
    // console.log(tod);

    const doi = [...this.state.todos.filter((doing) => doing._id !== id)];
    var C = {
      ...this.state.cur_user,
      todo: doi,
    };
    this.setState({ todos: C.todo });
    axios.post('http://localhost:5000/user/addtodo', { C }).then((res) => {
      this.setState({ cur_user: C });
      // this.setState({todos : C.todo})
    });

    C = {
      ...this.state.cur_user,
      doing: tod,
    };
    axios.post('http://localhost:5000/user/adddoing', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ doings: C.doing });
    });
  };

  donetodo = (id) => {
    const x = this.state.doings.filter((doing) => doing._id === id);
    const laterdoing = {
      _id: x[0]._id,
      task: x[0].task,
      description: x[0].description,
    };
    const tod = [...this.state.dones];
    tod.push(laterdoing);
    // console.log(tod);

    const doi = [...this.state.doings.filter((doing) => doing._id !== id)];
    var C = {
      ...this.state.cur_user,
      done: tod,
    };
    // console.log(C);
    this.setState({ dones: C.done });
    axios.post('http://localhost:5000/user/adddone', { C }).then((res) => {
      this.setState({ cur_user: C });
      // this.setState({todos : C.todo})
    });

    C = {
      ...this.state.cur_user,
      doing: doi,
    };
    axios.post('http://localhost:5000/user/adddoing', { C }).then((res) => {
      this.setState({ cur_user: C });
      this.setState({ doings: C.doing });
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
  };
};

export default connect(mapStateToProps)(ToDoMain);
