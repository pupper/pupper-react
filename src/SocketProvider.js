import {Component} from 'react';
import PropTypes from 'prop-types';

class SocketProvider extends Component {
    getChildContext () {
        const {bindTo, socket} = this.props;
        return {
            bindTo,
            socket
        };
    }

    render () {
        const {children} = this.props;
        return children;
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
