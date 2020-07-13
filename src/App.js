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
import PageNotFound from './components/PageNotFound/PageNotFound';
function App(props) {
  useEffect(() => {
    props.fetch_user();
  }, []);

  if (props.user.loading) {
    return <div className=''>Loading</div>;
  }
  // const renderContent = () => {
  //   if (props.user.isAuthenticated) {
  //     return (
  //       <>
  //         <Switch>

  //           <Route component={PageNotFound} />
  //         </Switch>
  //       </>
  //     );
  //   } else {
  //   }
  // };

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/questions' component={AppBuilder} />
          <Route exact path='/projects' component={Project} />
          {props.user.isAuthenticated ? (
            <div className=''>
              <Switch>
                <Route
                  exact
                  path={`/profile/${props.user.userData._id}`}
                  component={Profile}
                />
                <Route
                  exact
                  path={`/profile/todo/${props.user.userData._id}`}
                  component={ToDoMain}
                />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          ) : null}

          <Route component={PageNotFound} />
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

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
