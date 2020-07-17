import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginModal from '../LoginModal/LoginModal';
import { logoutUser } from '../../fullredux/actions/myActions';
const Navbar = (props) => {
  const logout = () => {
    props.logout_User();
    props.history.push('/');
  };

  const renderContent = () => {
    if (props.user.isAuthenticated) {
      return (
        <>
          <Link to={`/profile/todo/${props.user.userData._id}`}>Todo</Link>
          <Link to={`/profile/${props.user.userData._id}`}>Profile</Link>
          <button onClick={logout} className='btn btn-primary'>
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <LoginModal />
        </>
      );
    }
  };
  return (
    <div>
      <nav className='nav navbar bg-dark text-primary d-flex justify-content-around'>
        <Link to='/questions'>Questions Page</Link>
        <Link to='/projects'>Projects</Link>
        <Link to='/'>Home</Link>
        {renderContent()}
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout_User: () => {
      dispatch(logoutUser());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
