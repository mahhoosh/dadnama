import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Radio extends Component {
    constructor(props, context) {
        super(props, context);
        this.onSelect = this.onSelect.bind(this);

    }

    onSelect(e) {
        const {onChange, onSelected, index, id, value, name} = this.props;
        if (onSelected && e.target.checked) {
            onSelected(index, id, value, name);
        }
        if (onChange)
            onChange(e);
    }

    render() {
        const {
            label,
            name,
            checked,
            disabled
        } = this.props;

        return (
            <label
                className='RH-radio'
                {...this.props}
            >
                <input
                    className='inputRadio'
                    type="radio"
                    name={name}
                    onChange={this.onSelect}
                    checked={checked}
                    disabled={disabled}
                />
                <span
                    className='text'
                />

                <label>
                    {label}
                </label>
            </label>
        )
    }
}

Radio.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    onSelected: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.number,
    value: PropTypes.object,
    checked: PropTypes.bool,
    index: PropTypes.number,

    className: PropTypes.string,
    inline: PropTypes.bool,
    disabled: PropTypes.bool,

    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    info: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    success: PropTypes.bool,
    inverse: PropTypes.bool
};

export default Radio;
