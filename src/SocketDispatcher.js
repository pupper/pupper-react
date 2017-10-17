'use strict';

import {Component} from 'react';
import PropTypes from 'prop-types';

import ReactEvent from './ReactEvent';

class SocketDispatcher extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.socket = this.context.socket;
    }

    onSubmit() {
        const bindTo = this.props.bindTo || this.context.bindTo;
        this.context.socket.send(
            new ReactEvent()
                .setName(bindTo)
                .setValue(this.props.toSubmit)
                .build()
        );
    }

    componentWillUnmount() {
        this.socket = null;
    }
}

SocketDispatcher.propTypes = {
    bindTo: PropTypes.string,
    toSubmit: PropTypes.string,
};
SocketDispatcher.contextTypes = {
    socket: PropTypes.object.isRequired,
    bindTo: PropTypes.string,
};

export default SocketDispatcher;
