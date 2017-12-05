import {Component} from 'react';

import Event from './Event';
import PropTypes from 'prop-types';

class EventDispatcher extends Component {
    constructor () {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount () {
        const {context} = this.context;
        this.socket = context.socket;
    }

    componentWillUnmount () {
        this.socket = null;
    }

    onSubmit () {
        const {context} = this;
        const {bindTo, toSubmit} = this.props;
        context.socket.send(new Event()
            .setName(bindTo || context.bindTo)
            .setValue(toSubmit)
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
