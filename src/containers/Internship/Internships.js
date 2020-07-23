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
      <h1 className='my-2 text-center'>All Internships</h1>
      <div className='d-flex justify-content-center'>
        <InternshipModal />
      </div>
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
