import React, { useEffect } from 'react';

import InternshipModal from '../../components/Internship/InternshipModal';
import Internship from '../../components/Internship/Internship';
import { fetchInternships } from '../../fullredux/actions/InternshipAction';
import { connect } from 'react-redux';

function Internships(props) {
  useEffect(() => {
    props.fetchInternships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='container'>
      <h1>All Internships</h1>
      <InternshipModal />
      <Internship />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInternships: () => {
      dispatch(fetchInternships());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    internships: state.internships,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Internships);
