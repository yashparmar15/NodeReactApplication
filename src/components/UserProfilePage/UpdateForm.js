import React , {Component} from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

class UpdateForm extends Component{
    state = {
        cur_user : {},
        nameClass : "form-control green-error",
        nameError : false,
        emailClass : "form-control green-error",
        emailError : false,
        phoneClass : "form-control green-error",
        phoneError : false,
        linkedinClass : "form-control green-error",
        linkedinError : false,
        linkedinurl : "",
        githuburl : "",
        githubClass : "form-control green-error",
        githubError : false,
        expError : false,
        alerttext : '',
        alertclass : '',
    }
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.get("http://localhost:5000/user/getuserinfo",{
            params : {
                id : window.location.pathname.substr(9,24)
            }
            }).then((res) => {
                if(res.data){
                    this.setState({cur_user : res.data});
                } else {
                window.location = '/404'
                }
		});
    }

    changename = (e) => {
        switch(e.target.name){
            case 'name' : {
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/^[a-zA-Z]{1,15}\s([a-zA-Z]{1,15}\s)?[a-zA-Z]{1,15}$/)){
                       this.setState({nameClass : "form-control red-error"})
                       this.setState({nameError : true})
                    } else {
                        this.setState({nameClass : "form-control green-error"})
                        this.setState({nameError : false})
                    }   
                 }
                 break;
            }

            case 'email': {
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
                       this.setState({emailClass : "form-control red-error"})
                       this.setState({emailError : true})
                    } else {
                        this.setState({emailClass : "form-control green-error"})
                        this.setState({emailError : false})
                    }   
                }   
                break;
            }
            
            case 'phone' : {
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
                       this.setState({phoneClass : "form-control red-error"})
                       this.setState({phoneError : true})
                    } else {
                        this.setState({phoneClass : "form-control green-error"})
                        this.setState({phoneError : false})
                    }   
                }   
                break;
            }
            case 'linkedin' : {
                this.setState({linkedinurl : e.target.value});
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)){
                       this.setState({linkedinClass : "form-control red-error"})
                       this.setState({linkedinError : true})
                    } else {
                        this.setState({linkedinClass : "form-control green-error"})
                        this.setState({linkedinError : false})
                    }   
                } 
                if(e.target.value === "NaN"){
                    this.setState({linkedinClass : "form-control green-error"})
                    this.setState({linkedinError : false})
                }  
                break;
            }
            case 'github' : {
                this.setState({githuburl : e.target.value});
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)){
                       this.setState({githubClass : "red-error form-control"})
                       this.setState({githubError : true})
                    } else {
                        this.setState({githubClass : "form-control green-error"})
                        this.setState({githubError : false})
                    }   
                }   
                if(e.target.value === "NaN"){
                    this.setState({githubClass : "form-control green-error"})
                    this.setState({githubError : false})
                }
                break;
            }

            case 'college' :{
                if(e.target.value !== "")
                    this.setState({collegeError : true});
                else
                    this.setState({college : false}); 

                break;
            }

            case 'exp' : {
                if(typeof e.target.value !== "undefined"){
                    if(e.target.value < 0){
                        this.setState({expError : true});
                    } else {
                        this.setState({expError : false});
                    }
                }   
                break;
            }
            default : 
                break;
        }
        const temp = {
            ...this.state.cur_user,
            [e.target.name] : e.target.value
        }
        this.setState({cur_user : temp})
        // console.log(this.state.cur_user)
    }

    submitupdateform = () =>{
        const Current = this.state.cur_user;
        if(this.state.linkedinurl === "")
            Current.linkedin = "NaN";
        if(this.state.githuburl === "")
            Current.github = "NaN"

        
        if(!this.state.nameError && !this.state.emailError && !this.state.expError && !this.state.phoneError && !this.state.emailError && !this.state.linkedinError && !this.state.githubError){
            axios.post('http://localhost:5000/user/updateuser',{Current}).then(res => {

                window.location = `/profile/${res.data.id}`
                this.setState({alerttext : "Successfully Updated"});
                this.setState({alertclass : "alert alert-success"});
            })
        } else {
            this.setState({alerttext : "Error Occured Please try Again"})
            this.setState({alertclass : "alert alert-danger"});
        }
    }
    render(){
        var  NE = null;
        if(this.state.nameError){
            NE = (
                <p style = {{color : 'red' , fontSize : '10px' , marginTop : '5px'}}>Please Enter Your Full Name<br/>Name doesn't contain Numbers</p>
            )
        }
        var PhoneE = null;
        if(this.state.phoneError){
            PhoneE = (
                <p style = {{color : 'red' , fontSize : '10px' , marginTop : '5px'}}>Please Enter Valid Phone Number</p>
            )
        }
        var LinkedInE = null;
        if(this.state.linkedinError){
            LinkedInE = (
                <p style = {{color : 'red' , fontSize : '10px' , marginTop : '5px'}}>Please Enter Valid URL</p>
            )
            if(this.state.linkedinurl === "")
                LinkedInE = null;

        }
        var GithubE = null;
        if(this.state.githubError){
            GithubE = (
                <p style = {{color : 'red' , fontSize : '10px' , marginTop : '5px'}}>Please Enter Valid URL</p>
            )
            if(this.state.githuburl === "")
                GithubE = null;

        }
        var expE = null;
        var expclass = "form-control green-error";
        if(this.state.expError){
            expclass = "red-error form-control"
            expE = (
                <p style = {{color : 'red' , fontSize : '10px', marginTop : '5px'}}>Experience can't be Negative</p>
            )
        }

        var collegeClass = "";
        if(this.state.collegeError)
            collegeClass = "green-error";

        return(
            <>
            <div className={this.state.alertclass} role="alert">
                {this.state.alerttext}
            </div>
            <form>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Full name</label>
                    <div className="col-lg-9">
                        <input className={this.state.nameClass} type="text" name = "name" defaultValue = {this.state.cur_user.name} onChange = {this.changename.bind(this)} required/>
                        {NE}
                    </div>
                    
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Phone Number</label>
                    <div className="col-lg-9">
                        <input className={this.state.phoneClass} type="text" name = "phone" defaultValue = {this.state.cur_user.phone} onChange = {this.changename.bind(this)}/>
                        {PhoneE}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">College Name</label>
                    <div className="col-lg-9">
                        <input className="form-control green-error" type="text" name = "college" defaultValue = {this.state.cur_user.college} onChange = {this.changename.bind(this)} required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">LinkedIn Id</label>
                    <div className="col-lg-9">
                        <input className={this.state.linkedinClass} type="text  " name = "linkedin" defaultValue = {this.state.cur_user.linkedin} onChange = {this.changename.bind(this)}/>
                        {LinkedInE}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Github Id</label>
                    <div className="col-lg-9">
                        <input className={this.state.githubClass} type="text" name = "github" defaultValue = {this.state.cur_user.github} onChange = {this.changename.bind(this)}/>
                        {GithubE}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Work Experience</label>
                    <div className="col-lg-9">
                        <input className={expclass} type="number" name = "exp" defaultValue = {this.state.cur_user.exp} onChange = {this.changename.bind(this)} required/>
                        {expE}
                    </div>
                </div>
                <button type="button" className="btn btn-primary" value="Save Changes" style = {{marginLeft : "20px"}} onClick = {this.submitupdateform}>Save Changes</button>
                    
                
        </form>
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


export default connect(mapStateToProps)(UpdateForm);