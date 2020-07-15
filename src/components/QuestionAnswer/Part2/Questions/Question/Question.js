import React from "react";

import "./Question.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "font-awesome/css/font-awesome.min.css";
import { render } from "@testing-library/react";
import { Button, Modal } from "react-bootstrap";

const Question = (props) => {
	function MyVerticallyCenteredModal(props) {
		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>The question is this ok....</h4>
					<div className="form-group">
						<label className="col-form-label">Answer:</label>
						<textarea
							class="form-control"
							// name="description"
							// value={this.state.description}
							// onChange={this.onChange}
						></textarea>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	const [modalShow, setModalShow] = React.useState(false);

	return (
		<div className="question">
			<div className="detail">
				<h2 className="title">What is Business??</h2>
				<h3 className="description">I want to know about business process.</h3>
				<div className="tags">
					<div className="tag-q">business</div>
					<div className="tag-q">Science</div>
				</div>
				<p>
					<b>Yash Parmar</b> Asked on 06/07/2020
				</p>
				<p>
					{/* <b>
					View all <i className="fa fa-arrow-right"></i>
				</b> */}
					<Button variant="primary" onClick={() => setModalShow(true)}>
						View all <i className="fa fa-arrow-right"></i>
					</Button>

					<MyVerticallyCenteredModal
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
				</p>
			</div>
			<div className="info">
				<div className="sub">
					<p>100</p>views
				</div>
				<div className="sub">
					<p>1</p>answers
				</div>
				<div className="sub">
					<p>1</p>votes
				</div>
			</div>
		</div>
	);
};

export default Question;
