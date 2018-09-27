import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CheckIcon from 'component/Svg/CheckIcon';
import OutsideAlerter from 'component/OutsideAlerter/OutsideAlerter';


class MultiSelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
            value: null,
            resultList: []
        };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.onSelectNone = this.onSelectNone.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.resultList!==undefined ){
            if ( this.props.resultList !== nextProps.resultList) {
                var resultList = []
                for (let i = 0; i < this.props.list.length; i++) {
                    for (let j = 0; j < nextProps.resultList.length; j++) {
                        if (this.props.list[i].id === nextProps.resultList[j]) {
                            resultList.push(this.props.list[i]);
                        }
                    }
                }
                this.setState({
                    resultList: resultList
                });
            }
        }


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

    handleClick() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }


    onCheckChange(item) {
        var _this=this;
        let i = -1;
        const newResultList = this.state.resultList;
        try {
            i = newResultList.findIndex((x) => item.id === x.id);
        } catch (e) {

        }
        if (i > -1) {
            newResultList.splice(i, 1);
        } else {
            newResultList.push(item);
        }
        let result=[];
        for(let i=0;i<newResultList.length;i++){
            result.push(newResultList[i].id);
        }
        _this.props.onSelectionChange(result);
        this.setState({
            resultList: newResultList
        });
    }

    onSelectAll(){
        try{
            const newResultList = [];
            let result=[];
            for(let i=0;i< this.props.list.length;i++){
                newResultList.push(this.props.list[i]);
                result.push(this.props.list[i].id);
            }
            this.props.onSelectionChange(result);
            this.setState({
                resultList: newResultList
            });
        }catch (e){

        }
    }

    onSelectNone(){
        try{
            const empty = [];
            this.props.onSelectionChange(empty);
            this.setState({
                resultList: empty
            });
        }catch (e){

        }
    }

    isItemChecked(item) {
        let i = -1;
        try {
            i = this.state.resultList.findIndex((x) => item.id === x.id);
        } catch (e) {
        }
        if (i > -1)
            return true;
        return false;
    }

    render() {
        const {label, list, style} = this.props;
        return (
            <div className="select-input" style={style}>
                <label className={'_title'}>
                    {label}
                </label>
                <div className="_dropdown">
                    <OutsideAlerter
                        onOutsideClick={this.handleClickOutside}
                    >
                        <div
                            onClick={this.handleClick}
                            className={'_dropdownWrapper'}
                        >
                            <div
                                className="_dropdown-toggle"
                            >
                                {
                                    this.state.resultList.length > 0 &&
                                    this.state.resultList.map((result, index) => {
                                        return (
                                            <span
                                                key={index}
                                                style={{display: 'inline-block', paddingRight: 3}}>
                                            {index > 0 && ', '}
                                                {result.title}
                                        </span>
                                        );
                                    })
                                }

                            </div>
                            <span className="_caret"/>
                        </div>

                        <ul className={'_dropdown-menu _multiselect-menu ' + (this.state.popoverOpen ? '' : '-closed')}>
                            <span className="select-all-none">
                                {
                                    this.props.list && this.state.resultList && this.props.list.length === this.state.resultList.length
                                        ?
                                        <span onClick={this.onSelectNone}>Unselect all</span>
                                        :
                                        <span onClick={this.onSelectAll}>Select all</span>
                                }
                            </span>
                            {
                                list.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="_row"
                                            onClick={() => this.onCheckChange(item)}
                                        >
                                            <img className="_icon" src={item.icon} alt={item.icon}/>
                                            <label className="_label">{item.title}</label>
                                            {this.isItemChecked(item) && <CheckIcon className="_checkIcon"/>}

                                        </li>
                                    );

                                })
                            }
                        </ul>
                    </OutsideAlerter>
                </div>
            </div>

        );
    }
}


MultiSelectList.propTypes = {
    list: PropTypes.array,
    onSelectionChange: PropTypes.func,
    label: PropTypes.string,
    defaultSelected: PropTypes.object
};

export default MultiSelectList;
