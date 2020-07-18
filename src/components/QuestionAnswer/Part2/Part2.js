import React, { Component } from "react";

import "./Part2.css";

import Questions from "./Questions/Questions";
import makeAnimated from "react-select/animated";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import Select from "react-select";
const querystring = require("query-string");
// import { all } from "../../../../backend/routes/authRoute";

const animatedComponents = makeAnimated();

class part2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [
				{ value: "Python", label: "Python" },
				{ value: "Java", label: "Java" },
				{ value: "C++", label: "C++" },
				{ value: "ReactJS", label: "ReactJS" },
				{ value: "NodeJs", label: "NodeJs" },
			],
			Submit: "Submit",
		};

		this.customTheme = (theme) => {
			return {
				...theme,
				colors: {
					...theme.colors,
					primary25: "orange",
					primary: "green",
				},
			};
		};
		let allTags = [];
		this.handleTagChange = (selectedTag) => {
			allTags = [];
			this.setState({ selectedTag });
			if (selectedTag) {
				selectedTag.map((o) => {
					allTags.push(o.value);
					console.log(allTags);
					return allTags;
				});
			}
		};

		this.saveContent = (allTags) => {
			console.log(allTags);
			console.log(4);
			const filtertags = allTags;
			const question = "";
			const content = "";
			axios
				.post("/api/questions", {
					filtertags,
					question,
					content,
					allTags,
				})
				.then((res) => {
					console.log(res);
				});
		};

		this.onSubmit = (e) => {
			e.preventDefault();
			console.log(allTags);
			// const contentState = editorState.getCurrentContent();
			this.setState({
				Submit: "Submiited!",
				className_submit: "btn btn-success btn-md",
			});

			setTimeout(() => {
				this.setState({
					Submit: "Submit",
					className_submit: "btn btn-primary btn-md",
				});
			}, 2000);

			this.saveContent(allTags);
		};
	}
	render() {
		return (
			<div className="part2">
				<div className="head">
					<h1 className="heading">All Questions</h1>
					<form method="post" onSubmit={this.onSubmit}>
						<div className="filter">
							Filter By{" "}
							{/* <select className="options">
							<option>Select Categories</option>
						</select> */}
							<Select
								closeMenuOnSelect={false}
								components={animatedComponents}
								//   defaultValue={options}
								isMulti
								options={this.state.tags}
								placeholder="Tags.."
								theme={this.customTheme}
								// onChange={setName}
								onChange={this.handleTagChange}
								noOptionsMessage={() => "Tag not found 😞 "}
								className="mb-3"
							/>
							<button
								type="submit"
								// onClick={this.props.close}
								className={this.state.className_submit}
							>
								{this.state.Submit}{" "}
							</button>
						</div>
					</form>
				</div>
				<div className="filter2">
					<h3 className="filt">Latest</h3>
					<h3 className="filt">Votes</h3>
					<h3 className="filt">Unanswered</h3>
					<div className="perpage">
						Questions Per Page:{" "}
						<select className="ques">
							<option>12</option>
						</select>
					</div>
				</div>
				<Questions />
			</div>
		);
	}
}

export default part2;
