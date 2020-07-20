import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
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
    if (selectedTag) {
      selectedTag.map((o) => {
        allTags.push(o.value);
        console.log(allTags);
        return allTags;
      });
    }
  };

  return (
    <div>
      <button
        type='button'
        class='btn btn-primary position-fixed mb-3'
        data-toggle='modal'
        data-target='#exampleModal123'
      >
        Add Project
      </button>

      <div
        class='modal fade rounded-0 position-fixed'
        id='exampleModal123'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog rounded-0 modal-dialog-add' role='document'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                Add Your Project!
              </h5>
              <button
                type='button'
                class='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div class='modal-body'>
              <form className='container'>
                <label htmlFor='title'>Title</label>
                <input type='text' className='form-control' id='title' />
                <label htmlFor='description' className='mt-3'>
                  Description
                </label>
                <textarea className='form-control' id='description' />
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
                  className=''
                  id='tags'
                />

                <label htmlFor='githubLink' className='mt-3'>
                  Repository Link
                </label>
                <input type='text' className='form-control' id='githubLink' />
                <label htmlFor='deployLink' className='mt-3'>
                  Deployment Link
                </label>
                <input type='text' className='form-control' id='deployLink' />
              </form>
            </div>
            <div class='modal-footer container'>
              <button
                data-dismiss='modal'
                type='button'
                class='btn btn-primary'
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectAddModal;
