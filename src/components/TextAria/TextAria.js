import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TextAria extends Component {
    render() {
        const {
            label,
            errorText,
            style,
            important,
            icon,
            width,
            placeholder,
            onChange,
            value,
            name
        } = this.props;
        return (
            <div
                className='RH-textAria'
                style={style}>
                {
                    label &&
                    <label
                        className='label'
                    >
                        {label}
                        {
                            /*important && <Important>*</Important>*/
                        }
                    </label>
                }
                {
                    icon && <i className={`fa fa-${icon} _icon`}/>
                }
                <textarea
                    placeholder={placeholder}
                    onChange={onChange}
                    name={name}
                    className='textAria'
                    value={value}
                    style={{
                        width: `${width}`
                    }}
                />
                {/* {errorText && <Alert>{errorText}</Alert>}*/}
            </div>
        );
    }
}

TextAria.propTypes = {
    label: PropTypes.string,
    width: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    errorText: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    labelClassName: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    info: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    success: PropTypes.bool,
    inverse: PropTypes.bool,
    rtl: PropTypes.bool,
    borderColor: PropTypes.string,
    bgColor: PropTypes.string,
    foreColor: PropTypes.string,
    theme: PropTypes.object,
    icon: PropTypes.string,
    important: PropTypes.bool,
};

export default TextAria;
