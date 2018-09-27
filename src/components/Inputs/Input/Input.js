import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EditorState} from "draft-js";

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onFocus = this.onFocus.bind(this);
    }

    /* UNSAFE_componentWillReceiveProps(nextProps) {
         if (this.props.value !== nextProps.value) {
             this.setState({
                 value: nextProps.value
             });
         }
     }*/

    onFocus() {
        this.setState({
            value: ''
        });
    }

    render() {
        const {
            value,
            id,
            prefix,
            onChange,
            style,
            label,
            important,
            primary,
            onFocus,
            onBlur,
            placeholder,
            className,
            name,
            icon,
            disabled,
            iconComponent,
            hideLabelIfEmpty,
            shadowbox,
            onMouseDownIcon,
            onMouseUpIcon,
            maxWidth,
            inputShadow,
            onKeyUp,
            lblInline,
            ltr
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
            <label className={cls} style={style}>
                {
                    label && <label
                        className={`_label ${(!hideLabelIfEmpty || (value && value.length > 0)) ? '' : ' _hideLabel' }`}
                        style={{display: lblInline ? 'inline-block' : 'block'}}
                    >
                        {label}
                        {
                            important && <span className="_important">*</span>
                        }
                    </label>
                }
                <label className="_textContainer">
                    {
                        prefix && <span className="_prefix">
                            {prefix}
                        </span>
                    }

                    <input
                        value={value}
                        id={id}
                        onChange={onChange}
                        name={name}
                        onKeyUp={onKeyUp}
                        className={`_text_input ${className}`}
                        placeholder={placeholder}
                        pattern={this.props.pattern}
                        type={this.props.type}
                        maxLength={this.props.maxLength}
                        disabled={disabled}
                        onFocus={this.onFocus}
                        onBlur={onBlur}
                        style={{
                            paddingRight: `${iconComponent || icon ? '15px' : ''}`,
                            maxWidth: `${maxWidth}`,
                            direction: ltr ? 'ltr' : 'rtl'
                        }}
                    />
                    {
                        icon &&
                        <i className={`fa fa-${icon} _icon`}
                           onMouseDown={onMouseDownIcon}
                           onMouseUp={onMouseUpIcon}
                        />
                    }

                </label>
            </label>
        );
    }
}

Input.propTypes = {
    ltr: PropTypes.bool,
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
    name: PropTypes.string,
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