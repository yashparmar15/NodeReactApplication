import React from "react";
import DoneItem from "./DoneItem";
import Proptypes from "prop-types";
import AddDone from "./AddDone";

class Done extends React.Component {
	state = {
		addModalShow: false,
	};

	onHide = () => {
		this.setState({ addModalShow: false });
	};

	render() {
		return (
			<div className="card border-success mb-3 text-center">
				<div className="card-header bg-success font">Done</div>
				<div className="card-body text-success">
					<button
						type="button"
						className="btn btn-dark"
						onClick={() => this.setState({ addModalShow: true })}
					>
						Add Task
					</button>
					<AddDone
						show={this.state.addModalShow}
						onHide={this.onHide}
						addDone={this.props.addDone}
					/>
					{this.props.dones.map((done) => {
						return (
							<DoneItem
								key={done.id}
								done={done}
								laterdone={this.props.laterdone}
								deldone={this.props.deldone}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

const style = {
	width: "30%",
};

export default Done;
