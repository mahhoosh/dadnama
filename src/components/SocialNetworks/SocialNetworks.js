import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class SocialNetworks extends Component {
    render() {
        const {
            src,
            title,
            alertText,
            icon
        } = this.props;

        return (
            <ul className='am-socialNetworks'>
                <li>
                    <Link
                        to={'/'}
                    >
                        <i className="fa fa-telegram"/>
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/'}
                    >
                        <i className="fa fa-twitter"/>
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/'}
                    >
                        <i className="fa fa-facebook-f"/>
                    </Link>
                </li>
            </ul>
        )
    }
}

SocialNetworks.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.object,
    alertText: PropTypes.string,
    src: PropTypes.string,
    inverse: PropTypes.bool,
    style: PropTypes.object
};

export default SocialNetworks;
