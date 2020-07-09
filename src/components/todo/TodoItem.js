import React, { Component } from "react";
import Proptypes from "prop-types";

class TodoItem extends Component {
	render() {
		const { id, task, description } = this.props.todo;

		return (
			<div style={style}>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{task}</h5>
						<p className="card-text">{description}</p>
						<button
							className="btn btn-dark btn-sm"
							onClick={this.props.delTodo.bind(this, id)}
						>
							Remove
						</button>
						<button
							className="btn btn-warning btn-sm"
							onClick={this.props.letsdo.bind(this, id)}
						>
							Let's Do
						</button>
					</div>
				</div>
			</div>
		);
	}
}

// TodoItem.propTypes = {
// 	todo: Proptypes.object.isRequired,
// 	delTOdo: Proptypes.func.isRequired,
// };

const style = {
	marginTop: "10px",
};

export default TodoItem;
