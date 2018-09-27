import React, {Component} from 'react';
import Switch from 'component/Switch/Switch';

class Toggle extends Component {
    render() {
        const {

            style,
            checked,
            primary,
            onChange,
            className,
            shadowbox,
            label
        } = this.props;
        let cls = 'ToggleBox';
        if (shadowbox)
            cls += ' ToggleBoxShadowBox';
        else
            cls += ' ToggleBoxUnderlined';
        if (primary) cls += ' ToggleBoxPrimary';
        if (className) cls += ` ${className}`;
        return (
            <div className={cls} style={style}>
                <label className="_label">
                    {label}
                </label>
                <div className="_textContainer">
                    <label className="_text_input">
                        {
                            checked ? 'On' : 'Off'
                        }
                    </label>
                    <Switch
                        checked={checked}
                        onChange={onChange}
                        icons={{
                            checked: null,
                            unchecked: null
                        }}
                    />
                </div>
            </div>

        );
    }
}


export default Toggle;