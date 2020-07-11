import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import AppBuilder from './containers/AppBuilder/AppBuilder';
import Project from './containers/Project/Project';
import Profile from './containers/Profile/Profile';
import ToDoMain from './containers/ToDoMain/ToDoMain';
import { fetchUserAction } from './fullredux/actions/myActions';
function App(props) {
  useEffect(() => {
    props.fetch_user();
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/questions' component={AppBuilder} />
          <Route exact path='/projects' component={Project} />
          <Route exact path='/profile/todo' component={ToDoMain} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </Router>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user: () => {
      dispatch(fetchUserAction());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
