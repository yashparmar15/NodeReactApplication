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
            <div class = "part1">
                <button class = "askButton" onClick={this.onOpenModal}><i class = "fa fa-plus" aria-hidden="true"/>ASK A QUESTION</button>
                <AskQuestion flag = {this.state.open} close = {this.onCloseModal}/>
                <div class = "category">
                    <button class = "category-btn"><i class = "fa fa-question" aria-hidden="true"/>Questions</button>
                    <button class = "category-btn"><i class = "fa fa-tag" aria-hidden="true"/>Tags</button>
                    <button class = "category-btn"><i class = "fa fa-trophy" aria-hidden="true"/>Badges</button>
                    <button class = "category-btn"><i class = "fa fa-list-alt" aria-hidden="true"/>Categories</button>
                    <button class = "category-btn"><i class = "fa fa-users" aria-hidden="true"/>Users</button>
                </div>
                <div class = "terms">
                    <p>©2020 <br/><b>Terms & Privacy</b></p>
                </div>
            </div>
        );
    }
};

export default Part1;