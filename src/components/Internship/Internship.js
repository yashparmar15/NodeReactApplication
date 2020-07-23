import React, { useState } from 'react';
import { connect } from 'react-redux';
import InternshipCard from './InternshipCard';

function Internship(props) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [profile, setProfile] = useState('');
  const onChangeName = (e) => {
    setName(e.target.value);
    // console.log(title);
  };
  const onChangeCompany = (e) => {
    setCompany(e.target.value);
    // console.log(name);
  };
  const onChangeProfile = (e) => {
    setProfile(e.target.value);
    // console.log(name);
  };
  function FilterInternship(internship) {
    if (
      name !== null &&
      internship.name.toLowerCase().indexOf(name.toLowerCase()) === -1
    ) {
      return null;
    } else if (
      company !== null &&
      internship.companyName.toLowerCase().indexOf(company.toLowerCase()) === -1
    ) {
      return null;
    } else if (
      profile !== null &&
      internship.jobProfile.toLowerCase().indexOf(profile.toLowerCase()) === -1
    ) {
      return null;
    } else {
      return <InternshipCard internship={internship} />;
    }
  }
  return (
    <div>
      {!props.internships.internshipLoading && (
        <div className='ml-3 mt-3 mb-5'>
          <label htmlFor='name-filter'>Filter by Name:</label>
          <input
            type='text'
            className='form-control w-75'
            id='name-filter'
            onChange={onChangeName}
          />
          <label className='mt-2' htmlFor='comapany-filter'>
            Filter by Company:
          </label>
          <input
            type='text'
            id='company-filter'
            className='form-control w-75'
            onChange={onChangeCompany}
          />
          <label className='mt-2' htmlFor='job-profile-filter'>
            Filter by Job Profile:
          </label>
          <input
            type='text'
            id='job-profile-filter'
            className='form-control w-75'
            onChange={onChangeProfile}
          />
        </div>
      )}
      {props.internships.internships.map((internship) => (
        <span key={internship._id}> {FilterInternship(internship)} </span>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    internships: state.internships,
  };
};

export default connect(mapStateToProps)(Internship);
