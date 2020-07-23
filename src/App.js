import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppBuilder from './containers/AppBuilder/AppBuilder';
import Projects from './containers/Project/Projects';
import Profile from './containers/Profile/Profile';
import ToDoMain from './containers/ToDoMain/ToDoMain';
import { fetchUserAction } from './fullredux/actions/myActions';
import PageNotFound from './components/PageNotFound/PageNotFound';
import UserInfoForm from './components/UserInfoForm/UserInfoForm';
import loader from './assets/loaders/svg-loaders/tail-spin.svg';
import Internships from './containers/Internship/Internships';
// import loader from './assets/images/bg.jpg';
function App(props) {
  useEffect(() => {
    props.fetch_user();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (props.user.loading) {
    return (
      <div className='main-loader-div'>
        <img src={loader} alt='image1' className='main-loader' />
      </div>
    );
  }
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/questions' component={AppBuilder} />
          <Route exact path='/projects' component={Projects} />
          <Route exact path='/info' component={UserInfoForm} />

          {props.user.isAuthenticated ? (
            <div className=''>
              <Switch>
                <Route
                  exact
                  path={`/profile/${props.user.userData._id}`}
                  component={Profile}
                />
                <Route exact path='/internships' component={Internships} />
                <Route
                  exact
                  path={`/profile/todo/${props.user.userData._id}`}
                  component={ToDoMain}
                />
                <Route exact path={`/profile/:user_id`} component={Profile} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          ) : null}
          <Route exact path={`/profile/:user_id`} component={Profile} />

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
    users: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
