import React , {Component} from 'react';

import {connect} from 'react-redux';

import axios from 'axios';

class UserImage extends Component{
    state = {
        picture : '',
        userCur : {},
        check : this.props.user.userData._id === window.location.pathname.substr(9,24),
        loading : true,
    }

    componentDidMount = () => {
        axios.get("http://localhost:5000/user/getuserpicture",{
            params : {
                id : window.location.pathname.substr(9,24)
            }
            }).then((res) => {
                this.setState({picture : res.data.picture})
        });
        axios.get("http://localhost:5000/user/getuserinfo",{
            params : {
                id : window.location.pathname.substr(9,24)
            }
            }).then((res) => {
                if(res.data){
                    this.setState({userCur : res.data});
                } else {
                window.location = '/404'
                }
		});
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
        var show = null;
        if(this.state.check === true)
            show = <div className='overlay'>
            <button className='icon' title='Change Image' data-toggle="modal" data-target="#imagechange">
                <i className='fa fa-camera'></i>
            </button>
            </div>
        return(
            <>
                
                <div className='div-for-profile'>
                    {this.state.picture ? <img
                    src={this.state.picture}
                    className='mx-auto img-fluid img-circle d-block profile-pic-yash'
                    alt='avatar'
                    /> : <p>Some error occured please refresh the page</p>}
                    
                    
                    {show}
                    
                    
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
      allusers : state.users
    };
  };

export default connect(mapStateToProps)(UserImage);