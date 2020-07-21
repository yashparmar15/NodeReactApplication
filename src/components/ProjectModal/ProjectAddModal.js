import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';

import './ProjectAddModal.css';

const animatedComponents = makeAnimated();

function ProjectAddModal() {
  const [tags, setTags] = useState([
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    { value: 'ReactJS', label: 'ReactJS' },
    { value: 'NodeJs', label: 'NodeJs' },
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [deployLink, setDeployLink] = useState('');
  const [finalTags, setfinalTags] = useState([]);

  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'orange',
        primary: 'green',
      },
    };
  };

  let allTags = [];
  const handleTagChange = (selectedTag) => {
    allTags = [];
    // setTags({ allTags });
    // selectedTag({ selectedTag });
    if (selectedTag) {
      selectedTag.map((o) => {
        allTags.push(o.value);
        // console.log(allTags);
        setfinalTags(allTags);
        return allTags;
      });
    }
  };
  function handlesSubmit(e) {
    // console.log('reached');
    e.preventDefault();
    PostProject(title, description, repoLink, deployLink, finalTags);
    window.location.reload(false);
  }
  function PostProject(title, description, repoLink, deployLink, allTags) {
    // console.log(title, description, repoLink, deployLink, finalTags);
    axios
      .post('/api/projects', {
        title,
        description,
        repoLink,
        deployLink,
        finalTags,
      })
      .then(() => {});
  }

  return (
    <div>
      <button
        type='button'
        className='btn btn-success position-fixed mb-3 rounded-0 btn-lg'
        data-toggle='modal'
        data-target='#projectaddModal'
      >
        Add Project!
      </button>

      <div
        className='modal fade rounded-0 position-fixed'
        id='projectaddModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div
          className='modal-dialog rounded-0 modal-dialog-add'
          role='document'
        >
          <div className='modal-content modal-add-project-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add Your Project!
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body container'>
              <form onSubmit={handlesSubmit} method='post'>
                <label htmlFor='title'>Title*</label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  name='title'
                  required
                />
                <label htmlFor='description' className='mt-3'>
                  Description*
                </label>
                <textarea
                  className='form-control'
                  id='description'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
                <label htmlFor='tags' className='mt-3'>
                  Select Tags{' '}
                </label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  //   defaultValue={options}
                  isMulti
                  options={tags}
                  placeholder='Tags..'
                  theme={customTheme}
                  // onChange={setName}
                  onChange={handleTagChange}
                  noOptionsMessage={() => 'Tag not found 😞 '}
                  className='react-select-project-add'
                  id='tags'
                />

                <label htmlFor='githubLink' className='mt-3'>
                  Repository Link
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='githubLink'
                  onChange={(e) => setRepoLink(e.target.value)}
                  value={repoLink}
                />
                <label htmlFor='deployLink' className='mt-3'>
                  Deployment Link
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='deployLink'
                  onChange={(e) => setDeployLink(e.target.value)}
                  value={deployLink}
                />
                <div className='mt-3'>
                  <button
                    // data-dismiss='modal'
                    className='btn btn-success'
                    type='submit'
                  >
                    Save your Project!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectAddModal;
