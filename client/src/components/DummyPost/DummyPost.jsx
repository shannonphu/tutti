import React, { Component } from 'react';

class DummyPost extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.submitHandler = this.submitHandler.bind(this);
		props.getUsername();
	}

	submitHandler(event) {
		event.preventDefault();
		let name = this.refs.name.value;
		this.props.editUsername(name);
		this.refs.name.value = null;
	}

	render() {
		return (
			<div>
				<h3>Container</h3>
				<p>This is an example of a normal GET/POST request</p>
				<div>This text will update to whatever was input below: {this.props.user.name}</div>
				<form onSubmit={this.submitHandler}>
					<div>
						<input type="text" placeholder="Name" ref="name" />
					</div>
					<div>
						<button type="submit" name="action">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

export default DummyPost;