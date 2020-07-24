import React, { Component } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "font-awesome/css/font-awesome.min.css";
import draftToHtml from "draftjs-to-html";

import LikeDislike from "../../../../LikeDislike/LikeDislike";
import "./Question.css";
import Answers from "./Answers";
import axios from "axios";

class Question extends Component {
	state = {
		open: false,
		upvotes: this.props.upvotes.length,
		downvotes: this.props.downvotes.length,
		answers: this.props.answers,
	};

	onOpenModal = () => {
		this.setState({ open: true });
	};

	updatedanswers = (id) => {
		const q_id = id;
		console.log(this.state.answers);
		console.log(id);
		axios
			.get(`/api/answers/${q_id}`)
			.then((res) => {
				this.setState({ answers: res.data });
				// console.log(res.data);
			})
			.catch((err) => console.log(err));
	};

	onCloseModal = (id) => {
		// console.log(id);
		this.setState({ open: false });
		this.updatedanswers(id);
	};

	render() {
		return (
			<div className="question">
				<div className="detail">
					<h4 className="title">{this.props.title}</h4>
					<h3
						className="description"
						dangerouslySetInnerHTML={{
							__html: draftToHtml(JSON.parse(this.props.description)),
						}}
					></h3>
					<div className="tags">
						{this.props.allTags.map((tag) => (
							<div className="tag-q" key={Math.random()}>
								{tag}
							</div>
						))}
					</div>
					<p>
						<b>{this.props.askedBy.username}</b>
						<br />
						{moment(this.props.date).format("DD/MM/YYYY")}
					</p>
					<LikeDislike
						upvote={this.props.upvotes}
						downvote={this.props.downvotes}
						questionId={this.props.id}
					/>

					<button
						onClick={this.onOpenModal}
						className="btn btn-outline-info rounded-0 mb-3"
					>
						{" "}
						Enter your Answer/View all Answers!{" "}
						<i className="fa fa-arrow-right"></i>
					</button>
					<Answers
						flag={this.state.open}
						close={this.onCloseModal.bind(this, this.props.id)}
						answers={this.state.answers}
						id={this.props.id}
					/>
				</div>
				<div className="info">
					<div className="sub">
						<p>100</p>views
					</div>
					<div className="sub">
						<p>{this.props.totalanswers}</p>answers
					</div>
					<div className="sub">
						<p>
							<div className="vote-count text-danger">
								+{this.state.upvotes}{" "}
							</div>
							<div className="vote-count text-primary">
								-{this.state.downvotes}{" "}
							</div>
						</p>
						votes
					</div>
				</div>
			</div>
		);
	}
}

export default Question;
