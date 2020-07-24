import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function InternshipUpdateModal(props) {
  const [company, setCompany] = useState(props.company);
  const id = uuidv4();

  return (
    <div>
      <div className=''>
        <button
          type='button'
          className='btn'
          data-toggle='modal'
          data-target={`.${id}`}
        >
          <i className='fas fa-edit'></i>
        </button>

        <div
          className={`modal fade ${id} `}
          id={id}
          // tabindex='-1'
          role='dialog'
          aria-labelledby={`${id}123`}
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id={`${id}123`}>
                  {props.name}
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
              <div className='modal-body'>
                <input type='text' className='form-control' name='company' />

                <input type='text' className='form-control' name='profile' />
                {/* <label htmlFor='interview'></label>
                <textarea
                  id='interview'
                  value={props.interview}
                  className='form-control'
                  name='interview'
                /> */}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Close
                </button>
                <button type='button' className='btn btn-primary'>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternshipUpdateModal;
