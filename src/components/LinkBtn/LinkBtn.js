import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class LinkBtn extends Component {
    constructor(props) {
        super(props);
        this.state =
            {};

    }

    render() {
        const {
            src,
            title,
            primary,
            secondary,
            outlinePrimary,
            outlineSecondary,
            className,
            linkPrimary,
            linkSecondary,
            rounded,
            onClick
        } = this.props;
        let classNameBtn = '';
        if (primary) {
            classNameBtn = 'primary';
        } else if (secondary) {
            classNameBtn = 'secondary';
        } else if (outlinePrimary) {
            classNameBtn = 'outlinePrimary';
        } else if (outlineSecondary) {
            classNameBtn = 'outlineSecondary';
        } else if (linkPrimary) {
            classNameBtn = 'linkPrimary';
        } else if (linkSecondary) {
            classNameBtn = 'linkSecondary';
        }

        let classNameRounded = '';
        if (rounded) {
            classNameRounded = 'rounded';
        }

        return (
            <Link
                to={src}
                className={`am-link ${className} ${classNameBtn}  ${classNameRounded}`}
                onClick={onClick}
            >
                {title}
            </Link>
        );
    }
}

LinkBtn.propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    rounded: PropTypes.bool,
    primary: PropTypes.bool,
    outlinePrimary: PropTypes.bool,
    outlineSecondary: PropTypes.bool,
    linkPrimary: PropTypes.bool,
    linkSecondary: PropTypes.bool,
    secondary: PropTypes.bool,
    link: PropTypes.bool,
    onClick: PropTypes.func
};
export default LinkBtn;