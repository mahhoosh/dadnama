import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Input,
    OutsideAlerter,
    Close
} from 'components';

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onType = this.onType.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.lastHittime = 0;
        this.state = {
            value: props.value,
            editorText: '',
            arraySuggest: [],
            focused: false,
            isOpen: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            arraySuggest: nextProps.suggestionList
        })
    }

    onType(value) {
        const {suggestionList, suggestionCount, onValueChanged, async, onKeyPress, minCharsToSearch} = this.props;
        this.setState({
            value: value
        });
        onValueChanged(value);
        if (minCharsToSearch && value.length < minCharsToSearch)
            return;
        if (async) {
            this.lastHittime = Date.now();
            setTimeout(function () {
                if (Date.now() - this.lastHittime >= this.props.delayMillis)
                    onKeyPress(value);
            }.bind(this), this.props.delayMillis);
        }
        else {
            let arraySuggest = [];
            let maxCount = suggestionList.length;
            if (suggestionCount && suggestionCount < maxCount) {
                maxCount = suggestionCount;
            }
            for (let i = 0; i < maxCount; i++) {
                if (suggestionList[i].value.toLowerCase().includes(value.toLowerCase())) {
                    let obj = {
                        id: suggestionList[i].id,
                        value: suggestionList[i].value
                    };
                    arraySuggest.push(obj);

                }
            }
            this.setState({
                arraySuggest: arraySuggest
            });
        }
    }

    onItemClick(item) {
        const {onSearch, onSuggestionClick, onValueChanged} = this.props;
        this.setState({
            value: item.value,
            isOpen: false
        });
        onValueChanged(item.value);
        if (onSuggestionClick)
            onSuggestionClick(item);
        else
            onSearch(item.value);
    }

    onSearchClick() {
        const {onSearch} = this.props;
        onSearch(this.state.value);
    }

    render() {
        const {
            async,
            suggestionCount,
            suggestionList,
            showSearchButtom,
            label,
            important
        } = this.props;
        let searchedArray = [];
        if (async) {
            searchedArray = suggestionList;
        }
        else {
            searchedArray = this.state.arraySuggest;
        }
        if (suggestionCount && suggestionCount < searchedArray.length) {
            searchedArray = searchedArray.slice(0, suggestionCount);
        }
        return (
            <label className='autocomplete RH-search'>
                <label
                    className={'inputWrapper'}
                >
                    <span
                        className={'clean'}
                        onClick={() =>
                            this.setState({
                                value: ''
                            })
                        }
                    >
                        <Close/>
                    </span>
                    <input
                        placeholder=""
                        className={'inputSearch'}
                        onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                                this.onSearchClick();
                            }
                            else {
                                this.onType(e.target.value);
                            }
                        }
                        }
                        onFocus={() => {
                            this.setState({
                                focused: true,
                                isOpen: true
                            });
                        }}
                        onBlur={() => {
                            this.setState({
                                focused: false
                            });
                        }}
                        value={this.state.value}
                        onChange={(e) => {
                            this.setState({
                                value: e.target.value
                            });
                        }}/>
                    {showSearchButtom && <button
                        className={'btnSearch'}
                        onClick={this.onSearchClick}
                    >
                        <i className={'fa fa-search'}/>
                    </button>
                    }
                </label>
                <label className="alert-danger">{this.props.errorText}</label>
                {
                    this.state.isOpen && <OutsideAlerter
                        onOutsideClick={() => {
                            setTimeout(function () {
                                if (!this.state.focused) {
                                    this.setState({
                                        isOpen: false
                                    });
                                }
                            }.bind(this), 200);
                        }
                        }
                    >
                        {this.state.isOpen && this.state.arraySuggest.length > 0 &&
                        <div className='autocomplete__menu'>
                            <div className="autocomplete__menu--wrap">
                                <ul className='autocomplete__items'>{
                                    searchedArray.map((item, i) => {
                                        return (
                                            <li key={i} className='autocomplete__item' onClick={() => {
                                                this.onItemClick(item)
                                            }}>
                                                {item.value}
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        </div>}
                    </OutsideAlerter>
                }
            </label>

        );
    }
}

Search.propTypes = {
    suggestionList: PropTypes.array.isRequired,
    onKeyPress: PropTypes.func,
    onSearch: PropTypes.func,
    onSuggestionClick: PropTypes.func,
    onValueChanged: PropTypes.func,
    async: PropTypes.bool,
    delayMillis: PropTypes.number,
    suggestionCount: PropTypes.number,
    minCharsToSearch: PropTypes.number,
    showSearchButtom: PropTypes.bool,
    label: PropTypes.string,
    important: PropTypes.bool,
    errorText: PropTypes.string
};

export default Search;