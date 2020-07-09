import React, { Component } from "react";
import Proptypes from "prop-types";

class DoingItem extends Component {
	render() {
		const { id, task, description } = this.props.doing;

		return (
			<div style={style}>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{task}</h5>
						<p className="card-text">{description}</p>
						<button
							className="btn btn-primary btn-sm"
							onClick={this.props.laterdoing.bind(this, id)}
						>
							Later
						</button>
						<button
							className="btn btn-success btn-sm"
							onClick={this.props.donetodo.bind(this, id)}
						>
							Done
						</button>
					</div>
				</div>
			</div>
		);
	}
}

// DoingItem.propTypes = {
// 	doing: Proptypes.object.isRequired,
// };

const style = {
	marginTop: "10px",
};

export default DoingItem;
