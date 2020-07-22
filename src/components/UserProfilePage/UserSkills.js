import React , {Component} from 'react';

import {connect} from 'react-redux';

import axios from 'axios';

class UserSkills extends Component{
    state = {
        skills : [],
        userCur : {},
        check : this.props.user.userData._id === window.location.pathname.substr(9,24),
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
                    this.setState({skills : res.data.skills});
                } else {
                window.location = '/404'
                }
		});
        this.setState({loading : false})
    }

    addskills = (e) => {
        var flag = true;
        this.state.skills.map(skill => {
            if(skill === e.target.value)
                flag = false;
        })
        if(flag){
            var dummy = [...this.state.skills];
            dummy.push(e.target.value);
            this.setState({skills : dummy});
        }
    }
    removeskill = (e,skill) => {
        var dummy = [...this.state.skills];
        const index = dummy.indexOf(e);
        dummy.splice(index,1);
        this.setState({skills : dummy});
    }
    saveskills = () => {
        const UserSkills = [...this.state.skills]
        // console.log(this.state.skills , this.state.userCur);
        var dataUser = this.state.userCur;
        dataUser.skills = this.state.skills;
        // console.log(dataUser);
        axios.post('http://localhost:5000/user/changeskills',{dataUser}).then(res => {
            
        })
        return;
    }
    render(){
        var skills = "No Skills Please add";
        if(this.state.skills.length)
        skills = this.state.skills.map(skill =>{
            return <span className="badge badge-primary skill-badge" key={skill} onClick = {this.removeskill.bind(this,skill)} value = {skill}>{skill}</span>
        })
        var skillsP = "No Skills Please add";
        if(this.state.skills.length)
        skillsP = this.state.skills.map(skill =>{
            return <span className="badge badge-primary skill-badge" key={skill}  value = {skill}>{skill}</span>
        })
        return(
            <>
                <div className = "about-me-edit"><h6>Skills</h6>{this.state.check ? <i className="fa fa-edit edit-about"  aria-hidden="true" data-toggle="modal" data-target="#userskills"></i> : null}</div>
                <p>{skillsP}</p>
                <div className="modal fade" id="userskills" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Skills</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <select className = "form-control" onChange = {this.addskills.bind(this)}>
                            <option value = "HTML5">HTML5</option>
                            <option value = "CSS3">CSS3</option>
                            <option value = "Javascript">Javascript</option>
                            <option value = "JQuery">JQuery</option>
                            <option value = "BootStrap">BootStrap</option>
                            <option value = "ReactJS">ReactJS</option>
                        </select>
                        <b className = "click-to-remove">Click to remove</b>
                        <div className = "skills-container">
                            {skills}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.saveskills} data-dismiss="modal">Save changes</button>
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

export default connect(mapStateToProps)(UserSkills);