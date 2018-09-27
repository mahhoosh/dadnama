import React from 'react';
import PropTypes from 'prop-types';

export class BodyItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {
            childrenBody,
            isOpen
        } = this.props;

        return (
            <div className={`bodyWrap ${isOpen ? 'openBody' : ''}`}>
                {childrenBody}
            </div>
        );
    }
}

BodyItem.propTypes = {
    childrenBody: PropTypes.node,
    isOpen: PropTypes.bool,
};

export default BodyItem;

