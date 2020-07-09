import React from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import AppBuilder from "./containers/AppBuilder/AppBuilder";
import Project from './containers/Project/Project';
import Profile from './containers/Profile/Profile';
import ToDoMain from './containers/ToDoMain/ToDoMain';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Route exact path="/questions" component={AppBuilder} />
				<Route exact path="/projects" component={Project} />
				<Route exact path="/profile/todo" component={ToDoMain} />
        <Route exact path="/profile" component={Profile} />
			</Router>
		</>
	);
}

export default App;
