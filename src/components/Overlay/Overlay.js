import React from 'react';
import PropTypes from 'prop-types';

class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onClose: false
        }
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.onClose && this.props.onClose();
    }

    render() {
        const {open, children, className} = this.props;
        // show and hide overlay with open props
        return (
            <div className={`overlay ${className} ${open ? '-open' : '-closed'}`}>
                <div
                    className="icon"
                    onClick={this.onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 212.982 212.982" width="512px" height="512px"
                         aria-labelledby="title">
                        <path
                            d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                            id="path-1"
                            fill={'#ddd'}
                        >
                        </path>
                    </svg>
                </div>
                {children}
            </div>
        );
    }
}

Overlay.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.object,
    className: PropTypes.string,
    onClose: PropTypes.func,
};

Overlay.defaultProps = {
    className: 'default'
};

export default Overlay;
