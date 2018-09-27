import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TabLabels from './TabLabels';

class Tab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentTab: props.currentTab
        };
    }

    onTabChange(index) {
        this.setState({currentTab: index});
    }

    render() {
        const {tabs, primary, inverse,tabContent} = this.props;
        //const tabContent = tabs ? tabs[this.state.currentTab].content : null;
        console.log('tabs', tabs)
        return (
            <div className={'RH-tab'}>
                <TabLabels
                    tabs={tabs}
                    onTabChange={this.onTabChange.bind(this)}
                    currentTab={this.state.currentTab}
                    primary={primary}
                    inverse={inverse}
                    rtl={this.props.rtl}
                />
                <div className={'tabContent'}>
                    {tabContent}
                </div>
            </div>
        );
    }
}

Tab.propTypes = {
    tabs: PropTypes.array,
    style: PropTypes.object,
    tabContent: PropTypes.object,
    labelListStyle: PropTypes.object,
    currentTab: PropTypes.number,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    info: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    success: PropTypes.bool,
    inverse: PropTypes.bool,
};

export default Tab;
