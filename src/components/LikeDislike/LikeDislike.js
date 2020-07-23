import React, { useState, useEffect } from "react";

import "./LikeDislike.css";
import axios from "axios";
import { connect } from "react-redux";

function LikeDislike(props) {
	const [Like, setLike] = useState(props.upvote.length);
	const [Dislike, setDislike] = useState(props.downvote.length);

	var likeColor = "vote-btn-color";
	var dislikeColor = "vote-btn-color";
	if (props.upvote.includes(props.user._id)) {
		likeColor = "vote-like-btn-color vote-shadow";
	}
	if (props.downvote.includes(props.user._id)) {
		dislikeColor = "vote-dislike-btn-color vote-shadow";
	}
	const [LikeClass, setLikeClass] = useState(likeColor);
	const [DisLikeClass, setDisLikeClass] = useState(dislikeColor);

	let futureLike;
	let futuredislike;
	const upvotePost = (questionId) => {
		if (props.isAuthenticated) {
			axios
				.put("/api/question/upvoteQ", {
					questionId,
				})
				.then((res) => {
					console.log(res.data.upvotes.length, Like);

					futureLike = res.data.upvotes.length;
					futuredislike = res.data.downvotes.length;

					if (futureLike > Like) {
						setLikeClass("vote-like-btn-color vote-shadow");
					} else {
						setLikeClass("vote-btn-color");
					}
					if (futuredislike > Dislike) {
						setDisLikeClass("vote-dislike-btn-color vote-shadow");
					} else {
						setDisLikeClass("vote-btn-color");
					}

					setLike(res.data.upvotes.length);

					setDislike(res.data.downvotes.length);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const downvotePost = (questionId) => {
		axios
			.put("/api/question/downvoteQ", {
				questionId,
			})
			.then((res) => {
				futureLike = res.data.upvotes.length;
				futuredislike = res.data.downvotes.length;
				if (futureLike > Like) {
					setLikeClass("vote-like-btn-color vote-shadow");
				} else {
					setLikeClass("vote-btn-color");
				}
				if (futuredislike > Dislike) {
					setDisLikeClass("vote-dislike-btn-color vote-shadow");
				} else {
					setDisLikeClass("vote-btn-color");
				}
				setLike(res.data.upvotes.length);
				setDislike(res.data.downvotes.length);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<div className="d-flex flex-column mb-3">
				<div
					className={` vote-btn `}
					onClick={() => {
						upvotePost(props.questionId);
					}}
				>
					<div className={`like-cover ${LikeClass}  `}>
						<i className={`fas fa-arrow-up likeButton mr-2 `}></i> {Like}{" "}
					</div>
				</div>
				<div
					className={`vote-btn`}
					onClick={() => {
						downvotePost(props.questionId);
					}}
				>
					<div className={`dislike-cover ${DisLikeClass}  `}>
						<i className={`fas fa-arrow-down dislikeButton mr-2`}></i> {Dislike}
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.userData,
		// questions: state.question,
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps)(LikeDislike);
