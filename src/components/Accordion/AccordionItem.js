import React from 'react';
import PropTypes from 'prop-types';

import {
    BodyItem
} from 'components/Accordion';

export class AccordionItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.selectedItem === 'true')
            this.setState({
                isOpen: true
            });
    }

    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {
            childrenBody,
            title,
            selectedItem,
            IndexKey
        } = this.props;

        return (
            <div
                key={IndexKey}
                className={`RH-accordion ${this.state.isOpen ? 'open' : ''}`}
            >
                <h6 className="sectionHead"
                    onClick={this.handleClick}>
                    <label>
                        {title}
                    </label>
                    <i className="material-icons">
                        keyboard_arrow_up
                    </i>
                </h6>
                <BodyItem
                    childrenBody={childrenBody}
                    isOpen={this.state.isOpen}
                />
            </div>
        );
    }
}

AccordionItem.propTypes = {
    childrenBody: PropTypes.node,
    title: PropTypes.node,
    IndexKey: PropTypes.number,
    onClickSelectedItem: PropTypes.func,
    selectedItem: PropTypes.string
};

export default AccordionItem;

