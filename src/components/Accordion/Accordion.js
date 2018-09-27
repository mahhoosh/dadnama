import React from 'react';
import PropTypes from 'prop-types';
import {
    AccordionItem
} from 'components/Accordion/AccordionItem';

export class Accordion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: ''
        };
    }

    render() {
        const {
            childrenBody,
            title,
            IndexKey,
            selectedItem
        } = this.props;

        return (
            <AccordionItem
                IndexKey={IndexKey}
                selectedItem={(parseInt(selectedItem) === parseInt(IndexKey)) ? 'true' : 'false'}
                childrenBody={childrenBody}
                title={title}
            />
        );
    }
}

Accordion.propTypes = {
    childrenBody: PropTypes.node,
    IndexKey: PropTypes.string,
    title: PropTypes.node,
    selectedItem: PropTypes.number
};

export default Accordion;

