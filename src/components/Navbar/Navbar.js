import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <nav className='nav navbar bg-dark text-primary'>
        <div className=''>
          <Link to='/questions'>Questions Page</Link>
          <Link className='ml-3' to='/projects'>
            Projects
          </Link>
          <Link to='/profile/todo'>Todo</Link>
          <Link to='/profile'>Profile</Link>
        </div>
      </nav>
    </div>
  );
}
