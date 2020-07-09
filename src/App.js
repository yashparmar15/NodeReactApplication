import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import AppBuilder from './containers/AppBuilder/AppBuilder';
import Project from './containers/Project';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route exact path='/' component={AppBuilder} />
        <Route exact path='/projects' component={Project} />
      </Router>
    </>
  );
}

export default App;
