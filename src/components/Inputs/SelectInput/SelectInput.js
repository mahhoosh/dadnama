import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OutsideAlerter from 'components/OutsideAlerter/OutsideAlerter';

class SelectInput extends Component {
    constructor(props) {
        super(props);
        let selected = null;
        if (this.props.list)
            selected = this.props.list.find((x) => x.id === this.props.defaultSelected);
        this.state = {
            popoverOpen: false,
            value: null,
            selected: selected
        };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    handleClickOutside() {
        setTimeout(function () {
            if (!this.state.isFocused) {
                this.setState({
                    popoverOpen: false
                });
            }
        }.bind(this), 100);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultSelected !== nextProps.defaultSelected) {
            let selected = this.props.list.find((x) => x.id === nextProps.defaultSelected);
            this.setState({
                selected: selected
            })
        }
    }


    handleClick() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    onChangeValue(value) {
        let selected = this.props.list.find((x) => x.id === value);
        this.setState({
            selected: selected,
            popoverOpen: !this.state.popoverOpen,
            value: value
        });
        this.props.onChangeValue && this.props.onChangeValue(selected);

    }

    render() {
        const {label, list, style} = this.props;

        return (
            <div className="select-input" style={style}>
                <OutsideAlerter
                    onOutsideClick={this.handleClickOutside}
                >
                    <label className={'_title'}>
                        {label}
                    </label>
                    <div className="_dropdown">
                        <div
                            className="_dropdown-toggle"
                            onClick={this.handleClick}
                        >
                            {(this.state.selected && this.state.selected.icon) &&
                            <img className={'_icon'} src={this.state.selected.icon} alt={''}/>}
                            <span className={'_text'}>{this.state.selected && this.state.selected.name}</span>
                            <span className="_caret"/>
                        </div>
                        <ul className={'_dropdown-menu ' + (this.state.popoverOpen ? '' : '-closed')}>
                            {
                                list && list.map((item, index) => {
                                    return (
                                        <li key={index}
                                            value={item.id}
                                            onClick={() => this.onChangeValue(item.id)}
                                        >
                                            {item.icon && <img className={'_icon'} src={item.icon} alt={''}/>}

                                            {
                                                item.name
                                            }
                                        </li>
                                    );

                                })
                            }
                        </ul>
                    </div>
                </OutsideAlerter>
            </div>

        );
    }
}


SelectInput.propTypes = {
    list: PropTypes.array,
    onChangeValue: PropTypes.func,
    label: PropTypes.string,
    defaultSelected: PropTypes.string
};

export default SelectInput;
