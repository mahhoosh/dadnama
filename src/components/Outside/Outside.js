import React from 'react';
import PropTypes from 'prop-types';
import {
    OutsideItem
} from 'components';

class Outside extends React.Component {
    render() {
        const {open, children, className, outsideList} = this.props;

        return (
            <ul
                className={'outside'}
            >
                {
                    outsideList.map((data, index) => {
                        return <OutsideItem
                            title={data.title}
                            icon={data.icon}
                        />
                    })
                }
            </ul>
        );
    }
}

Outside.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.object,
    className: PropTypes.string,
    outsideList: PropTypes.array,
};

Outside.defaultProps = {
    className: 'default'
};

export default Outside;
