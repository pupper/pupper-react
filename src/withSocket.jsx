'use strict';

import React from 'react';

const withSocket = Component => (props, context) => {
    const {socket} = context;
    const bindTo = props.bindTo || context.bindTo;
    return <Component socket={socket} bindTo={bindTo} {...props}/>;
};

export default withSocket;
