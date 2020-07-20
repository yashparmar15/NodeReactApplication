import React from 'react';
import MultiSelect from '../MultiSelect/MultiSelect';

function ProjectFilterModal() {
  return (
    <>
      <div className='project-modal'>
        <button
          type='button'
          className='btn btn-info modal-button mb-3 mt-3'
          data-toggle='modal'
          data-target='#filterModal'
        >
          <i className='fas fa-filter'></i>
          <span className='ml-2'>Filter</span>
        </button>
        <div
          className='modal fade'
          id='filterModal'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  Filter
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>
                    <div className='modal-cross'>
                      <i className='fas fa-times'></i>
                    </div>
                  </span>
                </button>
              </div>
              <div className='modal-body'>
                <form>
                  <MultiSelect />
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  data-dismiss='modal'
                  type='button'
                  className='btn btn-success ayan-save-btn'
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectFilterModal;
