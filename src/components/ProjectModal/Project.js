import React from 'react';

const Project = (props) => {
  return (
    <div key={Math.random()} className='col-lg-6 mb-3 '>
      <div className='card mx-auto'>
        <div className='card-body'>
          <h4 className='card-title text-center text-white'>
            {props.project.title}
          </h4>
          <h6 className='card-subtitle mb-2 text-right text-white'>
            ~ {props.project.projectBy.username}
          </h6>
          <div className='card-text pr-3 mt-3'>
            <div className=''>{props.project.description}</div>
          </div>
          <h5 className='my-3 text-white'>Tags</h5>
          <div className='tags-wrapper mt-2'>
            {props.project.tags.map((tag) => (
              <div key={Math.random()} className='ayan-tags mb-2 text-center'>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className='card-footer bg-transparent border-primary'>
          <a
            href={props.project.githubLink}
            target='_blank'
            className='card-link'
          >
            GitHub Link
          </a>
          {props.project.deploymentLink && (
            <a
              href={props.project.deploymentLink}
              target='_blank'
              className='card-link'
            >
              Another link
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
