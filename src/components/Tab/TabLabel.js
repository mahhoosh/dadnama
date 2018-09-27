import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TabLabel extends Component {

    render() {
        const {title, active} = this.props;
        return (
            <li
                className={`tabTitle ${active}`}
                onClick={() => this.props.onTabChange(this.props.index)}
            >
                {title}
            </li>
        );
    }
}

TabLabel.PropTypes = {
    title: PropTypes.string,
    active: PropTypes.string,
    onTabChange: PropTypes.func,
    currentTab: PropTypes.number,
}

export default TabLabel;
