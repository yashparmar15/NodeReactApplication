import React from 'react';

import UserProfilePage from '../../components/UserProfilePage/UserProfilePage';
import { connect } from 'react-redux';

const Profile = (props) => {
  const renderContent = () => {
    if (props.user.loading) {
      return <div className=''>Loading</div>;
    }

    if (props.user.isAuthenticated) {
      console.log('reached');
      return <UserProfilePage />;
    } else {
      console.log('not authenticated');
      return props.history.push('/');
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
