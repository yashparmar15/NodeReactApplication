import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import AppBuilder from './containers/AppBuilder/AppBuilder';
import Project from './containers/Project';
import TodoMain from './containers/TodoMain';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route exact path='/' component={AppBuilder} />
        <Route exact path='/projects' component={Project} />
        <Route exact path='/todos' component={TodoMain} />
      </Router>
    </>
  );
}

export default App;
