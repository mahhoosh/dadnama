import React from 'react';
import PropTypes from 'prop-types';

class OutsideItem extends React.Component {
    render() {
        const {icon, title} = this.props;
        return (
            <li
                className={'outsideItem'}
            >
                {icon && <div
                    className={'icon'}
                >
                    {icon}
                </div>}
                <div className="title-box"><span className="title">{title}</span></div>
            </li>
        );
    }
}

OutsideItem.propTypes = {
    icon: PropTypes.object,
    children: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.string,
};

OutsideItem.defaultProps = {
    className: 'default'
};

export default OutsideItem;
