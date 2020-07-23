import React from 'react';

import InternshipModal from '../../components/Internship/InternshipModal';
import Internship from '../../components/Internship/Internship';

const Internships = () => {
  return (
    <div className='container'>
      <h1>All Internships</h1>
      <InternshipModal />
      <Internship />
    </div>
  );
};

export default Internships;
