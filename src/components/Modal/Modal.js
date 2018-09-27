import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.onBodyClick = false;
    }


    onClose(e) {
        if (this.props.open) {
            document.body.classList.remove('hidden')
        }
        if (!this.props.disableClose && this.props.onClose && !this.onBodyClick) {
            this.props.onClose(e);
        }
        this.onBodyClick = false;
    }

    render() {
        const {title, icon, disableClose, fullWidth, open, children, maxWidth, className} = this.props;
        if (open) {
            document.body.classList.add('activeModal')
        } else {
            document.body.classList.remove('activeModal')
        }
        // console.log('open',this.props.open)
        return (

            <div>
                {
                    open &&
                    <div className={`RH-Modal ${className}`}>
                        <div className="_overlay" onClick={this.onClose}>
                            <div
                                className={`_modalBody ${fullWidth ? '_fullWidth' : ''}`}
                                onClick={() => {
                                    this.onBodyClick = true;
                                }}
                                style={{maxWidth: maxWidth}}
                            >
                                <div className="_header">
                                    {icon &&
                                    <img className="_icon" src={icon} alt=""/>
                                    }
                                    {title &&
                                    <h2 className="_title">{title}</h2>
                                    }
                                    {
                                        !disableClose && <div
                                            className="_close"
                                            onClick={this.onClose}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                 viewBox="0 0 212.982 212.982" width="512px" height="512px"
                                                 aria-labelledby="title">
                                                <path
                                                    d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                                                    id="path-1"
                                                    fill={this.props.color}
                                                >
                                                </path>
                                            </svg>
                                        </div>
                                    }
                                </div>
                                <div className="_content">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        )
            ;
    }
}

Modal.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    disableClose: PropTypes.bool,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.number
};

Modal.defaultProps = {
    icon: null,
    title: null,
    open: false,
    onClose: null,
    disableClose: false,
    fullWidth: false
};