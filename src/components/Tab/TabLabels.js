import React, {Component} from 'react';
import TabLabel from './TabLabel';
import PropTypes from "prop-types";

class TabLabels extends Component {

    render() {
        const {tabs, currentTab} = this.props;
        return (
            <ul
                className={'tab'}
            >
                {
                    tabs && tabs.map((tab, index) => {
                        return (
                            <TabLabel
                                title={tab.title}
                                key={index}
                                index={index}
                                currentTab={this.props.currentTab}
                                active={`${currentTab === index ? 'active' : ''}`}
                                onTabChange={this.props.onTabChange}
                                primary={this.props.primary}
                                success={this.props.success}
                                secondary={this.props.secondary}
                                info={this.props.info}
                                warning={this.props.warning}
                                danger={this.props.danger}
                                inverse={this.props.inverse}
                                rtl={this.props.rtl}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

TabLabels.propTypes = {
    tabs: PropTypes.array,
    currentTab: PropTypes.number,
};

export default TabLabels;
