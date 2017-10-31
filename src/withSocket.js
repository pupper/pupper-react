/* eslint-disable */

import React from 'react';

const withSocket = Component => (props, context) => {
    const {socket} = context;
    const bindTo = props.bindTo || context.bindTo;
    return React.createElement(Component, Object.assign({
        bindTo,
        socket
    }, props), null);
};

export default withSocket;
