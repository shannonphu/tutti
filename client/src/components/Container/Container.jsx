import React, { Component } from 'react';
import { DummyPost, DummyChat } from '..';

class Container extends Component {
    constructor(props) {
        super(props);
		this.state = {};
		this.submitHandler = this.submitHandler.bind(this);
		// This calls the API to get an initial username
        props.getUsername();
    }

	submitHandler(event) {
		event.preventDefault();
		let name = this.refs.name.value;
		// This 
		this.props.addUsername(name);
		this.refs.name.value = null;
	}

    render() {
        return (
            <div>
				<DummyPost {...this.props} />
				<hr />
				<DummyChat {...this.props} />
            </div>
        )
    }
}

export default Container;