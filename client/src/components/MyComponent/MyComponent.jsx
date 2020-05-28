import React, { Component } from 'react';

class MyComponent extends Component {
    constructor(props) {
        super(props);
		this.state = {};
		this.submitHandler = this.submitHandler.bind(this);
        props.getUsername();
    }

	submitHandler(event) {
		event.preventDefault();
		let name = this.refs.name.value;
		console.log(name);
		console.log(this.props);
		this.props.addUsername(name);
		// axios.post("http://localhost:8080/user/name/add", {
		// 	lectureName: name
		// }, {
		// 		withCredentials: true
		// 	})
		// 	.then((response) => {
		// 		console.log("done");
		// 	})
		// 	.catch((error) => {
		// 		throw error;
		// 	});
	}

    render() {
        return (
            <div>
                <h3>MyComponent</h3>
                <div>{this.props.user.name}</div>
				<form onSubmit={this.submitHandler}>
					<div>
						<input type="text" placeholder="Lecture Name" ref="name" />
					</div>
					<div>
						<button type="submit" name="action">Submit</button>
					</div>
				</form>
            </div>
        )
    }
}

export default MyComponent;
