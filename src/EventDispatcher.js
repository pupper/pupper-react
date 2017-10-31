import {Component} from 'react';

import Event from './Event';
import PropTypes from 'prop-types';

class EventDispatcher extends Component {
    constructor () {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount () {
        this.socket = this.context.socket;
    }

    componentWillUnmount () {
        this.socket = null;
    }

    onSubmit () {
        const bindTo = this.props.bindTo || this.context.bindTo;
        this.context.socket.send(new Event()
            .setName(bindTo)
            .setValue(this.props.toSubmit)
            .build());
    }
}

EventDispatcher.propTypes = {
    bindTo: PropTypes.string,
    toSubmit: PropTypes.string
};
EventDispatcher.contextTypes = {
    bindTo: PropTypes.string,
    socket: PropTypes.object.isRequired
};

export default EventDispatcher;
