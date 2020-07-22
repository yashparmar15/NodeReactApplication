import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import './UserProfilePage.css';
import UserSkills from './UserSkills';
import { connect } from 'react-redux';

import UserImage from './UserImage';

import UserAbout from './UserAbout';
import UpdateForm from './UpdateForm';

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    cur_user: '',
    join: '',
    check : this.props.user.userData._id === window.location.pathname.substr(9,24),
    pro : window.location.pathname.substr(9,24),
    loading : true,
  };
  componentDidMount = () => {
    
    const path = window.location.pathname;
    const proid = path.substr(9,24);
    if(proid.length !== 24)
      window.location = '/404'
    console.log(proid)
    axios.get("http://localhost:5000/user/getuserinfo",{
      params : {
        id : proid
      }
    }).then((res) => {
        if(res.data){
          this.setState({cur_user : res.data});
          this.setState({join : res.data.joindate})
        } else {
          window.location = '/404'
        }
		});
    var flag = true;
    if(this.props.user.userData._id === proid)
      flag = false;
    if (flag && this.state.check) {
      window.location = '/info';
    }
  };
  render() {
    return (
      <div className='container' style={{ marginTop: '5vw' }}>
        
        <div className='row my-2'>
          <div className='col-lg-4 order-lg-1 text-center'>
            <UserImage check = {this.state.check}/>
            <h4 className='mt-4 user-name-yash'>{this.state.cur_user.name}</h4>
            <p>Joined On : {this.state.join.toString().substr(0, 10)}</p>
            <p className='mt-2 card-text'>
              {' '}
              For what reason would it be advisable for me to think about
              business content?{' '}
            </p>{' '}
            <button className='btn btn-info btn-sm mt-8 mb-4'>Follow</button>
            <div className='border-top pt-3 border-bottom mb-4'>
              <div className='row'>
                <div className='col-4'>
                  <h6>4354</h6>
                  <p>Post</p>
                </div>
                <div className='col-4'>
                  <h6>{this.state.cur_user.followers}</h6>
                  <p>Followers</p>
                </div>
                <div className='col-4'>
                  <h6>{this.state.cur_user.likes}</h6>
                  <p>Likes</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-8 order-lg-2'>
            <ul className='nav nav-tabs'>
              <li className='nav-item'>
                <div
                  data-target='#profile'
                  data-toggle='tab'
                  className='nav-link active profile-nav'
                >
                  Profile
                </div>
              </li>
              <li className='nav-item'>
                <div
                  data-target='#messages'
                  data-toggle='tab'
                  className='nav-link profile-nav'
                >
                  User Info
                </div>
              </li>
              {this.state.check ? <li className='nav-item'>
                <div
                  data-target='#edit'
                  data-toggle='tab'
                  className='nav-link profile-nav'
                >
                  Edit
                </div>
              </li> : null }
              
            </ul>
            <div className='tab-content py-4'>
              <div className='tab-pane active' id='profile'>
                <h5 className='mb-3'>User Profile</h5>
                <div className='row'>
                  <div className='col-md-6'>
                    <UserAbout check = {this.state.check} userCurrent = {this.state.cur_user}/>
                    <UserSkills check = {this.state.check} userId = {this.state.pro}/>
                  </div>
                  <div className='col-md-6'>
                    <span className='badge badge-primary yf'>
                      <i className='fa fa-user'></i>{' '}
                      {this.state.cur_user.followers} Followers
                    </span>
                    <span className='badge badge-success yf'>
                      <i className='fa fa-user'></i>{' '}
                      {this.state.cur_user.following} Following
                    </span>
                    <span className='badge badge-danger yf'>
                      <i className='fa fa-eye'></i>{' '}
                      {this.state.cur_user.views_on_profile} Views
                    </span>
                  </div>
                  <div className='col-md-12'>
                    <h5 className='mt-2'>
                      <i className='fa fa-clock ion-clock float-right'></i>{' '}
                      Recent Activity
                    </h5>
                    <table className='table table-sm table-hover table-striped'>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Abby</strong> joined ACME Project Team in{' '}
                            <strong>`Collaboration`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Gary</strong> deleted My Board1 in{' '}
                            <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Kensington</strong> deleted MyBoard3 in{' '}
                            <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>John</strong> deleted My Board1 in{' '}
                            <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Skell</strong> deleted his post Look at Why
                            this is.. in <strong>`Discussions`</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='tab-pane' id='messages'>
                <h5 className='mb-3'>User Information</h5>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6>College Name</h6>
                    <p>{this.state.cur_user.college}</p>
                    <h6>Branch</h6>
                    <p>{this.state.cur_user.branch}</p>
                    <h6>Passing Year</h6>
                    <p>{this.state.cur_user.year}</p>
                    <h6>Email Id</h6>
                    <a href='mailto:{this.state.cur_user.email}'>
                      {this.state.cur_user.email}
                    </a>
                    <p></p>
                    <h6>Phone Number</h6>
                    <p>{this.state.cur_user.phone}</p>
                    <h6>LinkedIn Profile</h6>
                    <a href={this.state.cur_user.linkedin}>
                      {this.state.cur_user.linkedin}
                    </a>
                    <p></p>
                    <h6>Github Profile</h6>
                    <a href={this.state.cur_user.github}>
                      {this.state.cur_user.github}
                    </a>
                    <p></p>
                    <h6>Work Experience</h6>
                    <p>{this.state.cur_user.exp} Years </p>
                  </div>
                  <div className='col-md-6'>
                    <span className='badge badge-primary yf'>
                      <i className='fa fa-user'></i>{' '}
                      {this.state.cur_user.followers} Followers
                    </span>
                    <span className='badge badge-success yf'>
                      <i className='fa fa-user'></i>{' '}
                      {this.state.cur_user.following} Following
                    </span>
                    <span className='badge badge-danger yf'>
                      <i className='fa fa-eye'></i>{' '}
                      {this.state.cur_user.views_on_profile} Views
                    </span>
                  </div>
                </div>
              </div>
              <div className='tab-pane' id='edit'>
                <UpdateForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(UserProfilePage);
