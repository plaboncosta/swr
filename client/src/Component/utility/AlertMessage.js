import React from 'react';

class AlertMessage extends React.Component {
    render() {
        const {alertType, msg} = this.props;
        return <div className={`alert alert-${alertType}`} role="alert">
            {msg}
        </div>;
    }
}

export default AlertMessage;