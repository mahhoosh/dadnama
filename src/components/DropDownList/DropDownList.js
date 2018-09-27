import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    OutsideAlerter
} from 'components';

class DropDownList extends Component {
    constructor(props) {
        super(props);
        let selected = null;
        if (this.props.list)
            selected = this.props.list.find((x) => x.id === this.props.defaultSelected);
        this.state = {
            value: null,
            id: null,
            selected: selected,
            popoverClose: false,
            popoverOpen: false
        };

        // This binding is necessary to make `this` work in the callback
        this.onChangeValue = this.onChangeValue.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    /*UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.defaultSelected !== nextProps.defaultSelected && nextProps.defaultSelected) {
            let selected = this.props.list.find((x) => x.id === nextProps.defaultSelected);
            this.setState({
                selected: selected
            });
        }
    }*/

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    onChangeValue(id) {
        let selected = this.props.list.find((x) => x.id === id);
        this.setState({
            selected: selected,
            popoverClose: false,
            popoverOpen: !this.state.popoverOpen,
            id: id
        });
        this.props.onChangeValue && this.props.onChangeValue(selected);
    }

    render() {

        const {list, style, maxWidth} = this.props;
        {console.log('item user_skills drop', list)}
        return (
            <div>
                <OutsideAlerter
                    onOutsideClick={() => {
                        this.setState({
                            popoverOpen: false
                        });
                    }
                    }
                >
                    <div className={`DropdownSelect _dropDownListSelectItem`}>
                        <div
                            className="_targetItem"
                            onClick={this.toggle}>
                            {
                                <div
                                    className={'_selectedItem'}
                                >
                                    {
                                        <span>
                                          {this.state.selected.title}
                                         </span>
                                    }
                                    <i className={'iconFont fa fa-angle-down'}/>
                                    {/* <img src={this.state.selected.src}/>*/}
                                </div>
                            }
                        </div>

                        <div className={'_pop ' + (this.state.popoverOpen ? '-open' : '-closed')}>
                            {/* TODO */}
                            {/* {this.state.popoverOpen && content} */}
                            <div className={'_contentWrapper'}>
                                <div className={'_content'}>
                                    <ul className={'_listWrapper'}
                                        style={{maxWidth: maxWidth}}
                                    >
                                        {
                                            list.map((data, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={`_list ${this.state.id === data.id ? 'active' : ''}`}
                                                        onClick={() => this.onChangeValue(data.id)}
                                                    >
                                                        <span
                                                            className={'_name'}
                                                        >
                                                            {data.title}
                                                        </span>
                                                        {/*<img src={data.src}/>*/}
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </OutsideAlerter>
            </div>
        );
    }
}


DropDownList.propTypes = {
    list: PropTypes.array,
    onChangeValue: PropTypes.func,
    defaultSelected: PropTypes.string,
    maxWidth: PropTypes.string,
};

export default DropDownList;
