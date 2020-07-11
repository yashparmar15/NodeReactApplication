import React from 'react';

import UserProfilePage from '../../components/UserProfilePage/UserProfilePage';
import { connect } from 'react-redux';

const Profile = (props) => {
  const renderContent = () => {
    switch (props.user) {
      case null:
        return <a href='/'>Loading</a>;
      case false:
        return props.history.push('/');
      default:
        return <UserProfilePage />;
    }
  };
  return <div className=''>{renderContent()}</div>;
};
const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(Profile);
