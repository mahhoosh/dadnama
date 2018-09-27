import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
    render() {
        const {
            src,
            title,
            alertText,
            icon
        } = this.props;

        return (
            <div className='alert'>
                {
                    src && <div
                        className={'imgWrapper'}
                    >
                        <img src={src}/>
                    </div>
                }
                <label
                    className={'titleAlert'}
                >
                    {title}
                </label>
                <label>
                    {alertText}
                </label>
                {icon && <i className="edit material-icons icon">{icon}</i>}
            </div>
        )
    }
}

Alert.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.object,
    alertText: PropTypes.string,
    src: PropTypes.string,
    inverse: PropTypes.bool,
    style: PropTypes.object
};

export default Alert;
