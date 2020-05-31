import React, { Component } from 'react';
import { DummyPost, DummyChat } from '..';

class Container extends Component {
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