import React , {Component} from 'react';

import {connect} from 'react-redux';

import axios from 'axios';

class UserAbout extends Component{
    state = {
        AboutMe : "",
        userCur : {},
        check : this.props.user.userData._id === window.location.pathname.substr(9,24),
        loading : true,
    }
    componentDidMount(){
        var Usr = {};
        axios.get("http://localhost:5000/user/getuserinfo",{
            params : {
                id : window.location.pathname.substr(9,24)
            }
            }).then((res) => {
                if(res.data){
                    this.setState({userCur : res.data});
                    this.setState({AboutMe : res.data.about});
                } else {
                window.location = '/404'
                }
		});
        this.setState({loading : false})
    }
    changeAbout(e){
        this.setState({AboutMe : e.target.value});
        if(this.state.AboutMe.length === 1)
            this.setState({AboutMe : "Nothing There"})
    }

    saveAbout = () =>{
        const dataUser = this.state.userCur;
        dataUser.about = this.state.AboutMe;
        axios.post('http://localhost:5000/user/change',{dataUser}).then(res => {
            // console.log(res);
        })
        return;
    }   

    render(){
        return(
            <>
                {this.state.loading ? <p>loading......</p> : <div><div className = "about-me-edit"><h6>About</h6>{this.state.check ? <i className="fa fa-edit edit-about"  aria-hidden="true" data-toggle="modal" data-target="#aboutchange"></i> : null}</div>
                <p>{this.state.AboutMe}</p></div>}
                
                
                <div className="modal fade" id="aboutchange" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Change About</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control"  placeholder="Enter text" onChange = {this.changeAbout.bind(this)} maxLength = "100"/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.saveAbout} data-dismiss="modal">Save changes</button>
                    </div>
                    </div>
                </div>
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

export default connect(mapStateToProps)(UserAbout);