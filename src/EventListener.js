'use strict';

import {Component} from 'react';
import PropTypes from 'prop-types';

import Event from './Event';

class EventListener extends Component {
    constructor() {
        super();
        this.onMessage = this.onMessage.bind(this);
    }

    componentWillMount() {
        this.socket = this.context.socket;
        this.socket.addEventListener('message', this.onMessage);
    }

    onMessage(e) {
        try {
            const bindTo = this.props.bindTo || this.context.bindTo;
            const event = Event.parse(e.data);
            if (event.getName() === bindTo) {
                this.onData(event.getValue());
            }
        } catch (e) {
            console.error(e);
        }
    }

    componentWillUnmount() {
        this.socket.removeEventListener('message', this.onMessage);
    }
}

EventListener.propTypes = {
    bindTo: PropTypes.string
};
EventListener.contextTypes = {
    socket: PropTypes.object.isRequired,
    bindTo: PropTypes.string,
};

export default EventListener;
