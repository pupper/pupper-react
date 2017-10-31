import {Component} from 'react';
import Event from './Event';
import PropTypes from 'prop-types';

class EventListener extends Component {
    constructor () {
        super();
        this.onMessage = this.onMessage.bind(this);
    }

    componentWillMount () {
        this.socket = this.context.socket;
        this.socket.addEventListener('message', this.onMessage);
    }

    componentWillUnmount () {
        this.socket.removeEventListener('message', this.onMessage);
    }

    onMessage (message) {
        const bindTo = this.props.bindTo || this.context.bindTo;
        const event = Event.parse(message.data);
        if (event.getName() === bindTo) {
            this.onData(event.getValue());
        }
    }
}

EventListener.propTypes = {bindTo: PropTypes.string};
EventListener.contextTypes = {
    bindTo: PropTypes.string,
    socket: PropTypes.object.isRequired
};

export default EventListener;
