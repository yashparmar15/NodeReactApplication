import React, { Component} from "react";
import { Button, Modal } from "react-bootstrap";
class AddTodo extends Component {
	state = {
		task: "",
		description: "",
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addTodo(this.state.task, this.state.description);
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
									class="form-control"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
								></textarea>
							</div>
							<Modal.Footer>
								<Button variant="secondary" onClick={this.props.onHide}>
									Close
								</Button>
								<Button
									variant="primary"
									type="submit"
									onClick={this.props.onHide}
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

export default AddTodo;
