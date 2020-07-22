import React , {Component , useEffect , useState}  from 'react';

import {connect } from 'react-redux';

import './UserInfoForm.css';

import axios from 'axios';

class UserInfoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : {
                id : this.props.userI.userData._id,
                name : "",
                gender : "",
                email : "",
                phone : "",
                college : "",
                year : "",
                branch : "",
                linkedin : "",
                github : "",
                exp : 0,
                joindate : new Date(),
                about : "Nothing There",
            },
            nameClass : "",
            nameError : false,
            emailClass : "",
            emailError : false,
            phoneClass : "",
            phoneError : false,
            linkedinClass : "",
            linkedinError : false,
            linkedinurl : "",
            githuburl : "",
            githubClass : "",
            githubError : false,
            expError : false,
            collegeError : false,
            buttonClicked : false,
        }
        this.SubmitUserInfo= this.SubmitUserInfo.bind(this);
    }

    componentDidMount(){
        var flag = false;
        var A;
        console.log("Connected")
        axios.get('http://localhost:5000/user/getall').then((response)=>{
            // console.log(response.data)
            A = response.data;
            A.map(a => {
                if(a.id === this.props.userI.userData._id){
                    alert("You already fill the form\nWe are redirecting you to your profile page");
                   window.location = `/profile/${this.props.userI.userData._id}`;
                }
            })
        }).catch(err => console.log(err));
    }
    ButtonClicked = () =>{
        this.setState({buttonClicked : true});
    }
    nameChange(e){

        switch(e.target.name){
            case 'name' : {
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/^[a-zA-Z]{1,15}\s([a-zA-Z]{1,15}\s)?[a-zA-Z]{1,15}$/)){
                       this.setState({nameClass : "red-error"})
                       this.setState({nameError : true})
                    } else {
                        this.setState({nameClass : "green-error"})
                        this.setState({nameError : false})
                    }   
                 }
                 break;
            }
            case 'phone' : {
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
                       this.setState({phoneClass : "red-error"})
                       this.setState({phoneError : true})
                    } else {
                        this.setState({phoneClass : "green-error"})
                        this.setState({phoneError : false})
                    }   
                }   
                break;
            }
            case 'linkedin' : {
                this.setState({linkedinurl : e.target.value});
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)){
                       this.setState({linkedinClass : "red-error"})
                       this.setState({linkedinError : true})
                    } else {
                        this.setState({linkedinClass : "green-error"})
                        this.setState({linkedinError : false})
                    }   
                }   
                break;
            }
            case 'github' : {
                this.setState({githuburl : e.target.value});
                if(typeof e.target.value !== "undefined"){
                    if(!e.target.value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)){
                       this.setState({githubClass : "red-error"})
                       this.setState({githubError : true})
                    } else {
                        this.setState({githubClass : "green-error"})
                        this.setState({githubError : false})
                    }   
                }   
                break;
            }

            case 'college' :{
                if(e.target.value !== "")
                    this.setState({collegeError : false});
                else
                    this.setState({college : true}); 

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
    }

    SubmitUserInfo(e){
        e.preventDefault();
        const dataUser = {
            id : this.props.userI.userData._id,
            name : e.target[0].value,
            gender : e.target[1].value,
            email : this.props.userI.userData.email,
            phone : e.target[2].value,
            college : e.target[3].value,
            year : e.target[4].value,
            branch : e.target[5].value,
            linkedin : e.target[6].value,
            github : e.target[7].value,
            exp : e.target[8].value,
            about : "Nothing There",
        }
        if(e.target[3].value === "")
            dataUser.phone = "NaN";
        if(e.target[7].value === "")
            dataUser.linkedin = "NaN";
        if(e.target[8].value === "")
            dataUser.github = "NaN";
        this.setState({user : dataUser});
        console.log(this.state)
        if(!this.state.nameError  && this.state.buttonClicked && !this.state.expError && !this.state.githubError && !this.state.collegeError && !this.state.linkedinError && !this.state.phoneError){
            axios.post('http://localhost:5000/user',{dataUser}).then(res => {
                window.location = '/';
            })
        } else {
            alert("Something went wrong!\nPlease Try Again");
        }
    }
    render(){
        var  NE = null;
        if(this.state.nameError){
            NE = (
                <p style = {{color : 'red' , fontSize : '10px'}}>Please Enter Your Full Name<br/>Name doesn't contain Numbers</p>
            )
        }
        var PhoneE = null;
        if(this.state.phoneError){
            PhoneE = (
                <p style = {{color : 'red' , fontSize : '10px'}}>Please Enter Valid Phone Number</p>
            )
        }
        var LinkedInE = null;
        if(this.state.linkedinError){
            LinkedInE = (
                <p style = {{color : 'red' , fontSize : '10px'}}>Please Enter Valid URL</p>
            )
            if(this.state.linkedinurl === "")
                LinkedInE = null;

        }
        var GithubE = null;
        if(this.state.githubError){
            GithubE = (
                <p style = {{color : 'red' , fontSize : '10px'}}>Please Enter Valid URL</p>
            )
            if(this.state.githuburl === "")
                GithubE = null;

        }
        var expE = null;
        var expclass = "green-error";
        if(this.state.expError){
            expclass = "red-error"
            expE = (
                <p style = {{color : 'red' , fontSize : '10px'}}>Experience can't be Negative</p>
            )
        }

        var collegeClass = "";
        if(this.state.collegeError)
            collegeClass = "green-error";

        return(
            <div className = "user-form-back">
            <div className="form-style-10">
                <h1>User Information<span>Please fill up the form to complete your registration!</span></h1>
                <form onSubmit = {this.SubmitUserInfo}>
                    <div className="section"><span>1</span>About You</div>
                    <div className="inner-wrap">
                        <label>Your Full Name<span className = "req-span">*</span> <input className = {this.state.nameClass} type="text" name="name" required placeholder = "Your Name" onChange = {this.nameChange.bind(this)}/></label>
                        {NE}
                        <label>Gender<span>*</span> <select  name = "gender" className = "slct green-error" onChange = {this.nameChange.bind(this)}>
                                <option value = "Male">Male</option>
                                <option value = "Female">Female</option>
                                <option value = "Other">Other</option>
                            </select></label>
                        
                    </div>

                    <div className="section"><span>2</span>Phone</div>
                    <div className="inner-wrap">
                        <label>Phone Number <input className = {this.state.phoneClass} type="text" name="phone" onChange = {this.nameChange.bind(this)}/></label>
                        {PhoneE}
                    </div>
                    <div className="section"><span>3</span>College Info</div>
                    <div className="inner-wrap">
                        <label>College Name<span>*</span> <input className = {collegeClass} type="text" name="college" required onChange = {this.nameChange.bind(this)}/></label>
                        <label>Passing Year<span>*</span> <select className = "slct green-error" name= "year" onChange = {this.nameChange.bind(this)}>
                            <option value = "2020">2020</option>
                            <option value = "2021">2021</option>
                            <option value = "2022">2022</option>
                            <option value = "2023">2023</option>
                            <option value = "2024">2024</option>
                            <option value = "2025">2025</option>
                            <option value = "2026">2026</option>
                            <option value = "2027">2027</option>
                            <option value = "2028">2028</option>
                            <option value = "2029">2029</option>
                            <option value = "2030">2030</option>
                            </select>
                        </label>
                        <label>Branch<span>*</span> <select className = "slct green-error" name= "branch" onChange = {this.nameChange.bind(this)}>
                            <option value = "Computer Science and Engineering">Computer Science and Engineering</option>
                            <option value = "Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value = "Mechanical Engineering">Mechanical Engineering</option>
                            <option value = "Electrical Engineering">Electrical Engineering</option>
                            <option value = "Civil Engineering">Civil Engineering</option>
                            <option value = "Chemical Engineering">Chemical Engineering</option>
                            <option value = "Biochemical / Biomedical Engineering">Biochemical / Biomedical Engineering</option>
                            <option value = "Aerospace / Aeronautical Engineering">Aerospace / Aeronautical Engineering</option>
                            <option value = "Agriculture & Food Engineering">Agriculture & Food Engineering</option>
                            <option value = "Automobile Engineering">Automobile Engineering</option>
                            <option value = "Biotechnology Engineering">Biotechnology Engineering</option>
                            <option value = "Ceramic Engineering">Ceramic Engineering</option>
                            <option value = "Engineering Physics">Engineering Physics</option>
                            <option value = "Environmental Engineering">Environmental Engineering</option>
                            <option value = "Industrial Engineering">Industrial Engineering</option>
                            <option value = "Information Technology Engineering">Information Technology Engineering</option>
                            <option value = "Marine Engineering">Marine Engineering</option>
                            <option value = "Metallurgical Engineering">Metallurgical Engineering</option>
                            <option value = "Petroleum Engineering">Petroleum Engineering</option>
                            <option value = "Textile Engineering">Textile Engineering</option>
                        </select>
                        </label>
                    </div>


                    <div className="section"><span>4</span>Work</div>
                        <div className="inner-wrap">
                        <label>LinkedIn Profile<input className = {this.state.linkedinClass} type="text" name="linkedin" placeholder = "https://www.linkedin.com/in/XXXXX/" onChange = {this.nameChange.bind(this)}/></label>
                        {LinkedInE}
                        <label>Github Profile<input className = {this.state.githubClass} type="text" name="github" placeholder = "https://github.com/xyz" onChange = {this.nameChange.bind(this)}/></label>
                        {GithubE}
                        <label>Work Experience(year)<input className = {expclass} type="number" name="exp" placeholder= "0" onChange = {this.nameChange.bind(this)} required/></label>
                        {expE}
                    </div>
                    <div className="button-section">
                    <button type = "submit" className = "btn-submit-info-form" onClick = {this.ButtonClicked}>Register</button>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      userI: state.auth,
    };
};

export default connect(mapStateToProps)(UserInfoForm);