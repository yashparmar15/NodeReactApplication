import React from 'react';
import { connect } from 'react-redux';
import InternshipCard from './InternshipCard';

function Internship(props) {
  return (
    <div>
      <h1>Single Internship</h1>
      {props.internships.internships.map((internship) => {
        return <InternshipCard internship={internship} />;
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    internships: state.internships,
  };
};

export default connect(mapStateToProps)(Internship);
