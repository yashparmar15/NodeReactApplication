import React,{Component} from 'react';

import './Part1.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

import AskQuestion from './AskQuestion/AskQuestion';

class Part1 extends Component{
    state = {
        open: false
    };
    
    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };
    render(){
        return(
            <div className = "part1">
                <div>
                <button className = "askButton" onClick={this.onOpenModal}><i className = "fa fa-p2 fa-plus" aria-hidden="true"/>  ASK A QUESTION</button>
                <AskQuestion flag = {this.state.open} close = {this.onCloseModal}/>
                </div>
                <div className = "category">
                    <button className = "category-btn"><i className = "fa-p2 fa fa-question" aria-hidden="true"/> Questions</button>
                    <button className = "category-btn"><i className = "fa fa-p2 fa-tag" aria-hidden="true"/> Tags</button>
                    <button className = "category-btn"><i className = "fa fa-p2 fa-trophy" aria-hidden="true"/> Badges</button>
                    <button className = "category-btn"><i className = "fa fa-p2 fa-list-alt" aria-hidden="true"/> Categories</button>
                    <button className = "category-btn"><i className = "fa fa-p2 fa-users" aria-hidden="true"/> Users</button>
                </div>
                <div className = "terms">
                    <p>©2020 <br/><b>Terms & Privacy</b></p>
                </div>
            </div>
        );
    }
};

export default Part1;