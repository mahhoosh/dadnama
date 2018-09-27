import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state =
            {};

    }

    render() {
        const {
            label,
            onClick,
            cancel,
            deleteBtn,
            primary,
            secondary,
            gray,
            icon,
            className,
            type,
            value,
            btnOutlinePrimary,
            primaryLink,
            iconLeft,
            materialIcons,
            xSmall,
            spinner
        } = this.props;
        let classNameBtn = '';
        if (cancel) {
            classNameBtn = '_cancel';
        } else if (deleteBtn) {
            classNameBtn = '_delete';
        } else if (primary) {
            classNameBtn = '_primary';
        } else if (secondary) {
            classNameBtn = '_secondary';
        } else if (gray) {
            classNameBtn = '_gray';
        } else if (btnOutlinePrimary) {
            classNameBtn = 'btn-outline-primary';
        } else if (primaryLink) {
            classNameBtn = 'primaryLink';
        }

        let classNameIcon = '';
        if (iconLeft) {
            classNameIcon = 'iconLeft';
        }

        let xSmallClass = '';
        if (xSmall) {
            xSmallClass = 'xSmallClass';
        }

        return (
            <button
                className={`RH-button ${className} ${classNameBtn} ${classNameIcon} ${xSmallClass}`}
                type={type}
                onClick={onClick}
                value={value}
            >
                <span>
                    {
                        spinner ?
                            <i className="fa fa-refresh fa-spin spinner" aria-hidden="true"/> :
                            icon && <i className={`fa fa-${icon}`}/> ||
                            materialIcons && <i className="material-icons">
                                {materialIcons}
                            </i>
                    }
                    {
                        label && <label>
                            {label}
                        </label>
                    }
                </span>
            </button>
        );
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.object,
    materialIcons: PropTypes.object,
    handleClick: PropTypes.func,
    cancel: PropTypes.bool,
    deleteBtn: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    gray: PropTypes.bool,
    btnOutlinePrimary: PropTypes.bool,
    primaryLink: PropTypes.bool,
    iconLeft: PropTypes.bool,
    xSmall: PropTypes.bool,
    spinner: PropTypes.bool
};
export default Button;