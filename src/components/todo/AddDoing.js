import React, { Component} from "react";
import { Button, Modal } from "react-bootstrap";
import {connect} from 'react-redux';
import axios from 'axios';
class AddDoing extends Component {
	state = {
		task: "",
		description: "",
		cur_user : {},
	};
	componentDidMount =()=>{
		var Cur;
		this.props.users.usersData.map(U =>{
			if(U.id === this.props.user.userData._id)
				Cur = U;
		});
		this.setState({cur_user : Cur});
	}
	onSubmit = (e) => {
		e.preventDefault();
		const doingadd = {
			task : this.state.task,
			description : this.state.description,
		}
		const doingArray = [...this.state.cur_user.doing];
		doingArray.push(doingadd);
		const C = {
			...this.state.cur_user,
			doing : doingArray
		}
		// console.log(C);
		axios.post('http://localhost:5000/user/adddoing',{C}).then(res => {
            // console.log(res);
		})
		window.location = `/profile/todo/${C.id}`
		this.setState({ task: "", description: "" });
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	render() {
		return (
			<div>
				<Modal
					show={this.props.show}
					onHide={this.props.onHide}
					// animation={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Add Task</Modal.Title>
					</Modal.Header>
					<form style={{ display: "flex" }} onSubmit={this.onSubmit}>
						<Modal.Body>
							<div className="form-group">
								<label className="col-form-label">Task:</label>
								<input
									type="text"
									className="form-control"
									name="task"
									value={this.state.task}
									onChange={this.onChange}
								/>
							</div>
							<div className="form-group">
								<label class="col-form-label">Description:</label>
								<textarea
									className="form-control"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
								></textarea>
							</div>
							<Modal.Footer>
								<Button
									variant="secondary"
									onClick={this.props.onHide}
									// style={style}
								>
									Close
								</Button>
								<Button
									variant="primary"
									type="submit"
									onClick={this.props.onHide}
									// style={style}
								>
									Save Changes
								</Button>
							</Modal.Footer>
						</Modal.Body>
					</form>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
	  user: state.auth,
	  users:state.user,
	};
};
export default connect(mapStateToProps)(AddDoing);
