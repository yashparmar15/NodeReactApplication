import React, { useEffect } from 'react';

import ProjectFilterModal from '../../components/ProjectModal/ProjectFilterModal';
import ProjectAddModal from '../../components/ProjectModal/ProjectAddModal';
import './Project.css';
import { fetchProjects } from '../../fullredux/actions/projectAction';
import { connect } from 'react-redux';
import Project from '../../components/ProjectModal/Project';
import Loader from '../../assets/loaders/svg-loaders/spinning-circles.svg';
import AuthenticateProjectModal from '../../components/ProjectModal/AuthenticateProjectModal';

function Projects(props) {
  useEffect(() => {
    props.fetchPro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='project-bg'>
        <div className=''>
          {props.isAuthenticated && (
            <div className='pt-3 pl-3'>
              <ProjectAddModal />
            </div>
          )}
          <div className='project-header-bg'>
            <h1 className='text-center'>PROJECTS</h1>
          </div>
        </div>
        {!props.isAuthenticated && <AuthenticateProjectModal />}

        <ProjectFilterModal />
        <div className='container'>
          {props.projects.projectLoading && (
            <img src={Loader} className='questionLoader' alt='loader' />
          )}
          <div className='row'>
            {props.projects.projects.map((project) => (
              <Project key={project._id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPro: () => {
      dispatch(fetchProjects());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
