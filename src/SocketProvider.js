import {Component} from 'react';
import PropTypes from 'prop-types';

class SocketProvider extends Component {
    getChildContext () {
        return {
            bindTo: this.props.bindTo,
            socket: this.props.socket
        };
    }

    render () {
        return this.props.children;
    }
}

SocketProvider.propTypes = {
    bindTo: PropTypes.string,
    children: PropTypes.any,
    socket: PropTypes.object.isRequired
};

SocketProvider.childContextTypes = {
    bindTo: PropTypes.string,
    socket: PropTypes.object.isRequired
};

export default SocketProvider;
