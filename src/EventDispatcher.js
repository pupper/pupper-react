'use strict';

import {Component} from 'react';
import PropTypes from 'prop-types';

import Event from './Event';

class EventDispatcher extends Component {
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
            new Event()
                .setName(bindTo)
                .setValue(this.props.toSubmit)
                .build()
        );
    }

    componentWillUnmount() {
        this.socket = null;
    }
}

EventDispatcher.propTypes = {
    bindTo: PropTypes.string,
    toSubmit: PropTypes.string,
};
EventDispatcher.contextTypes = {
    socket: PropTypes.object.isRequired,
    bindTo: PropTypes.string,
};

export default EventDispatcher;
