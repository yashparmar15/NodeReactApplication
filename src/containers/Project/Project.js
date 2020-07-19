import React from 'react';

import ProjectModal from '../../components/ProjectModal/ProjectModal';
import './Project.css';
function Projects() {
  return (
    <>
      <div className='project-bg'>
        <div className=''>
          <div className='p-3'>
            <button className='btn btn-primary position-fixed'>
              Add Project
            </button>
          </div>
        </div>
        <div className='project-header-bg'>
          <h1 className='text-center'>PROJECTS</h1>
        </div>

        <ProjectModal />
        <div className='container'>
          <div className='row'>
            {[1, 2, 3, 4, 5].map(() => (
              <div key={Math.random()} className='col-lg-6 mb-3 '>
                <div className='card mx-auto'>
                  <div className='card-body'>
                    <h4 className='card-title text-center text-white'>
                      Project Title
                    </h4>
                    <h6 className='card-subtitle mb-2 text-right text-white'>
                      ~ Ayan Adhya
                    </h6>
                    <div className='card-text pr-3 mt-3'>
                      <div className=''>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatem eligendi delectus minima laudantium, labore
                        optio voluptatibus? maxime magnam, itaque, esse sit
                        nesciunt. Lorem, ipsum dolor sit amet consectetur
                        adipisicing elit. Voluptatibus laudantium saepe
                        perspiciatis dolorum fugit laborum ut sapiente
                        repudiandae sint sed quaerat ipsam suscipit inventore
                        iure voluptate et aliquam perferendis quasi ex at,
                        commodi quod excepturi! Dicta quos aliquid fugiat,
                        aliquam placeat odio nobis inventore quisquam animi nemo
                        minus expedita beatae sequi maiores! Magni unde omnis
                        pariatur atque numquam similique ut? lorem90
                      </div>
                    </div>
                    <h5 className='my-3 text-white'>Tags</h5>
                    <div className='tags-wrapper mt-2'>
                      {[
                        1,
                        2,
                        3,
                        4,
                        5,
                        1,
                        2,
                        3,
                        4,
                        5,
                        1,
                        2,
                        3,
                        4,
                        5,
                        1,
                        2,
                        3,
                      ].map(() => (
                        <div
                          key={Math.random()}
                          className='ayan-tags mb-2 text-center'
                        >
                          Python
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='card-footer bg-transparent border-primary'>
                    <a href='/' className='card-link'>
                      GitHub Link
                    </a>
                    <a href='/' className='card-link'>
                      Another link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
