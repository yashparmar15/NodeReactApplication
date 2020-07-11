import React, { useState, useEffect } from 'react';

import background from '../../assets/images/background.jpg';

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
      name: props.user.username,
      picture: props.user.picture,
      email: props.user.email,
    });
  }, []);
  //   if (!props.user) {
  //     props.history.push('/');
  //   }
  return (
    <div class='container main-secction'>
      <div class='row'>
        <div class='col-md-12 col-sm-12 col-xs-12 image-section'>
          <img src={background} alt='Cover Photo' />
        </div>
        <div class='row user-left-part'>
          <div class='col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left'>
            <div class='row '>
              <div class='col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center'>
                <img src={userdata.picture} alt='a' />
              </div>
              <div class='col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center'>
                <button class='btn btn-defult follow '>
                  <i class='fa fa-user-o' aria-hidden='true'></i> FOLLOW
                </button>
              </div>
              <div class='row user-detail-row'>
                <div class='col-md-12 col-sm-12 user-detail-section2 pull-left'>
                  <div class='border'></div>
                  <p>FOLLOWER</p>
                  <span>320</span>
                </div>
                <div class='col-md-12 col-sm-12 user-detail-section2 pull-right'>
                  <div class='border'></div>
                  <p>FOLLOWING</p>
                  <span>147</span>
                </div>
              </div>
              <div class='col-md-12 user-detail-section2'>
                <div class='border'></div>
                <p>PERFORMANCE</p>
                <span>
                  56 <small>and 42 review</small>
                </span>
              </div>
            </div>
          </div>
          <div class='col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section'>
            <div class='row profile-right-section-row'>
              <div class='col-md-12 profile-header'>
                <div class='row'>
                  <div class='col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left'>
                    <h1>{userdata.name}</h1>
                    <p>{userdata.email}</p>
                  </div>
                  <div class='col-md-4 col-sm-6 col-xs-6 profile-header-section1 text-right pull-rigth'>
                    <button class='btn btn-info req-btn'> REQUEST</button>
                  </div>
                </div>
              </div>
              <div class='col-md-12'>
                <div class='row'>
                  <div class='col-md-8  profile-tag-section text-center'>
                    <div class='row'>
                      <div class='col-md-3 col-sm-3 profile-tag'>
                        <a href='#'>
                          <i
                            class='fa fa-calendar-check-o'
                            aria-hidden='true'
                          ></i>
                        </a>
                        <p>info</p>
                      </div>
                      <div class='col-md-3 col-sm-3 profile-tag'>
                        <a href='#'>
                          <i class='fa fa-address-book' aria-hidden='true'></i>
                        </a>
                        <p>feed</p>
                      </div>
                      <div class='col-md-3 col-sm-3 profile-tag'>
                        <a href='#'>
                          <i class='fa fa-id-card-o' aria-hidden='true'></i>
                        </a>
                        <p>Agenda</p>
                      </div>
                      <div class='col-md-3 col-sm-3 profile-tag'>
                        <a href='#'>
                          <i class='fa fa-paperclip' aria-hidden='true'></i>
                        </a>
                        <p>Resume</p>
                      </div>
                    </div>
                  </div>
                  <div class='col-md-4 img-main-rightPart'>
                    <div class='row'>
                      <div class='col-md-12'>
                        <div class='row image-right-part'>
                          <div class='col-md-6 pull-left image-right-detail'>
                            <p>TODAYHIGHLIGHT</p>
                          </div>
                          <div class='col-md-6 pull-right image-right-detail text-right'>
                            <span>
                              <a href='http://nicesnippets.com'>more</a>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-12 image-right'>
                        <img src={background} alt='a' />
                      </div>
                      <div class='col-md-12 image-right-detail-section2'>
                        <p>Urban planning consulation</p>
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipisibj.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
