'use strict';

import {Component} from 'react';
import PropTypes from 'prop-types'

class SocketProvider extends Component {
    getChildContext() {
        return {
            socket: this.props.socket,
            bindTo: this.props.bindTo,
        };
    }

    render() {
        return this.props.children;
    }
}

SocketProvider.propTypes = {
    socket: PropTypes.object.isRequired,
    bindTo: PropTypes.string,
};
SocketProvider.childContextTypes = {
    socket: PropTypes.object.isRequired,
    bindTo: PropTypes.string,
};

export default SocketProvider;
