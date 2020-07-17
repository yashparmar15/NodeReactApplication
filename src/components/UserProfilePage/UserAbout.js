import React , {Component} from 'react';

import {connect} from 'react-redux';

import axios from 'axios';

class UserAbout extends Component{
    state = {
        AboutMe : "",
        userCur : {}
    }
    componentDidMount(){
        var Usr;
        this.props.users.usersData.map(u =>{
            if(u.id === this.props.user.userData._id)
                Usr = u;
        })
        this.setState({userCur : Usr});
        this.setState({AboutMe : Usr.about});
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
                <div className = "about-me-edit"><h6>About</h6><i className="fa fa-edit edit-about"  aria-hidden="true" data-toggle="modal" data-target="#aboutchange"></i></div>
                <p>{this.state.AboutMe}</p>
                
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