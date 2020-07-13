import React, { useState, useEffect } from 'react';

import './UserProfilePage.css';
import { connect } from 'react-redux';

const UserProfilePage = (props) => {
  const [userdata, setUserData] = useState({
    name: '',
    picture: '',
    email: '',
  });

  useEffect(() => {
    setUserData({
      name: props.user.userData.username.toUpperCase(),
      picture: props.user.userData.picture,
      email: props.user.userData.email,
    });
  }, []);
  //   if (!props.user) {
  //     props.history.push('/');
  //   }
  return (
    <div className='container' style={{ marginTop: '5vw' }}>
      <div className='row my-2'>
        <div className='col-lg-4 order-lg-1 text-center'>
          <div className='div-for-profile'>
            <img
              src={userdata.picture}
              className='mx-auto img-fluid img-circle d-block profile-pic-yash'
              alt='avatar'
            />
            <div className='overlay'>
              <a href='/' className='icon' title='Change Image'>
                <i className='fa fa-camera'></i>
              </a>
            </div>
          </div>
          <h4 className='mt-4 user-name-yash'>{userdata.name}</h4>
          <p className='mt-2 card-text'>
            {' '}
            For what reason would it be advisable for me to think about business
            content?{' '}
          </p>{' '}
          <button className='btn btn-info btn-sm mt-8 mb-4'>Follow</button>
          <div className='border-top pt-3 border-bottom mb-4'>
            <div className='row'>
              <div className='col-4'>
                <h6>4354</h6>
                <p>Post</p>
              </div>
              <div className='col-4'>
                <h6>455K</h6>
                <p>Followers</p>
              </div>
              <div className='col-4'>
                <h6>34K</h6>
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
                Messages
              </div>
            </li>
            <li className='nav-item'>
              <div
                data-target='#edit'
                data-toggle='tab'
                className='nav-link profile-nav'
              >
                Edit
              </div>
            </li>
          </ul>
          <div className='tab-content py-4'>
            <div className='tab-pane active' id='profile'>
              <h5 className='mb-3'>User Profile</h5>
              <div className='row'>
                <div className='col-md-6'>
                  <h6>About</h6>
                  <p>Web Designer, UI/UX Engineer</p>
                  <h6>Hobbies</h6>
                  <p>
                    Indie music, skiing and hiking. I love the great outdoors.
                  </p>
                </div>
                <div className='col-md-6'>
                  <span className='badge badge-primary yf'>
                    <i className='fa fa-user'></i> 900 Followers
                  </span>
                  <span className='badge badge-success yf'>
                    <i className='fa fa-user'></i> 43 Following
                  </span>
                  <span className='badge badge-danger yf'>
                    <i className='fa fa-eye'></i> 245 Views
                  </span>
                </div>
                <div className='col-md-12'>
                  <h5 className='mt-2'>
                    <i className='fa fa-clock ion-clock float-right'></i> Recent
                    Activity
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
              <div className='alert alert-info alert-dismissable'>
                <a className='panel-close close' data-dismiss='alert'>
                  ×
                </a>{' '}
                This is an <strong>.alert</strong>. Use this to show important
                messages to the user.
              </div>
              <table className='table table-hover table-striped'>
                <tbody>
                  <tr>
                    <td>
                      <span className='float-right font-weight-bold'>
                        3 hrs ago
                      </span>{' '}
                      Here is your a link to the latest summary report from
                      the..
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='float-right font-weight-bold'>
                        Yesterday
                      </span>{' '}
                      There has been a request on your account since that was..
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='float-right font-weight-bold'>9/10</span>{' '}
                      Porttitor vitae ultrices quis, dapibus id dolor. Morbi
                      venenatis lacinia rhoncus.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='float-right font-weight-bold'>9/4</span>{' '}
                      Vestibulum tincidunt ullamcorper eros eget luctus.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='float-right font-weight-bold'>9/4</span>{' '}
                      Maxamillion ais the fix for tibulum tincidunt ullamcorper
                      eros.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='tab-pane' id='edit'>
              {/* <form role="form">
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">First name</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text" value="Jane"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Last name</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text" value="Bishop"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="email" value="email@gmail.com"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Company</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text" value=""/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Website</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="url" value=""/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Address</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text" value="" placeholder="Street"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label"></label>
                            <div className="col-lg-6">
                                <input className="form-control" type="text" value="" placeholder="City"/>
                            </div>
                            <div className="col-lg-3">
                                <input className="form-control" type="text" value="" placeholder="State"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Time Zone</label>
                            <div className="col-lg-9">
                                <select id="user_time_zone" className="form-control" size="0">
                                    <option value="Hawaii">(GMT-10:00) Hawaii</option>
                                    <option value="Alaska">(GMT-09:00) Alaska</option>
                                    <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                                    <option value="Arizona">(GMT-07:00) Arizona</option>
                                    <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                                    <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                                    <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                                    <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Username</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text" value="janeuser"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Password</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="password" value="11111122333"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="password" value="11111122333"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label"></label>
                            <div className="col-lg-9">
                                <input type="reset" className="btn btn-secondary" value="Cancel"/>
                                <input type="button" className="btn btn-primary" value="Save Changes"/>
                            </div>
                        </div>
                    </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(UserProfilePage);
