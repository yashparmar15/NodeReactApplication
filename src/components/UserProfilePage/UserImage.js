import React , {Component} from 'react';

import {connect} from 'react-redux';

import axios from 'axios';

class UserImage extends Component{
    state = {
        picture : '',
        userCur : {}
    }
    onSubmit = (e) =>{
        e.preventDefault()
        let formData = new FormData()
        formData.append('picture', this.state.picture)
        formData.append("id", this.props.user.userData._id);
        const id = this.props.user.userData._id;
        axios.post("http://localhost:5000/user/user-profile", formData, {
        }).then(res => {
            window.location = `/profile/${id}`
        }).catch(err => console.log(err))
    }
    
    imagechangefunc = async (e) =>{
        this.setState({picture : e.target.files[0]});
    }

    render(){
        return(
            <>
                <div className='div-for-profile'>
                    <img
                    src={this.props.user.userData.picture}
                    className='mx-auto img-fluid img-circle d-block profile-pic-yash'
                    alt='avatar'
                    />
                    <div className='overlay'>
                    <button className='icon' title='Change Image' data-toggle="modal" data-target="#imagechange">
                        <i className='fa fa-camera'></i>
                    </button>
                    </div>
                </div>
                <div className="modal fade" id="imagechange" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <form onSubmit={this.onSubmit}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Change Profile Picture</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="file" name="profileImg"  placeholder="Enter text" onChange = {this.imagechangefunc.bind(this)}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" >Save changes</button>
                    </div>
                
                    </div>
                    
                </div>
                </form>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.auth,
      users:state.user,
    };
  };

export default connect(mapStateToProps)(UserImage);