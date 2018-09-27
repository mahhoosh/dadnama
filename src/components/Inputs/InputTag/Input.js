import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
    render() {
        const {
            value,
            id,
            onChange,
            style,
            primary,
            onFocus,
            onBlur,
            placeholder,
            className,
            icon,
            disabled,
            iconComponent,
            shadowbox,
            maxWidth,
            inputShadow,
            onKeyUp,
            rtl
        } = this.props;
        let cls = 'RH-input-wrapper';
        if (shadowbox)
            cls += ' InputBoxShadowBox';
        else
            cls += ' InputBoxUnderlined';
        if (primary) cls += ' InputBoxPrimary';
        if (inputShadow) cls += ' inputShadowClass';
        if (className) cls += ` ${className}`;
        return (
            <input
                value={value}
                id={id}
                onChange={onChange}
                onKeyUp={onKeyUp}
                className={`_text_input ${className}`}
                placeholder={placeholder}
                pattern={this.props.pattern}
                type={this.props.type}
                maxLength={this.props.maxLength}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                style={style}
            />
        );
    }
}

Input.propTypes = {
    rtl: PropTypes.bool,
    placeholder: PropTypes.string,
    maxWidth: PropTypes.string,
    prefix: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseDownIcon: PropTypes.func,
    onMouseUpIcon: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    label: PropTypes.string,
    lblInline: PropTypes.bool,
    className: PropTypes.string,
    important: PropTypes.bool,
    primary: PropTypes.bool,
    hideLabelIfEmpty: PropTypes.bool,
    style: PropTypes.object,
    shadowbox: PropTypes.bool,
    inputShadow: PropTypes.bool,
    icon: PropTypes.string,
    type: PropTypes.string,
    pattern: PropTypes.string,
    maxLength: PropTypes.string,
    id: PropTypes.string,
    iconComponent: PropTypes.object

};

Input.defaultProps = {
    hideLabelIfEmpty: false
};

export default Input;