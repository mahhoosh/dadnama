import React from 'react';
import PropTypes from 'prop-types';
import loadingImg from 'assets/images/loading-after-signup.png';

class LoadingBox extends React.Component {

    render() {
        return (
            <div
                className={'loadingWrapper'}
            >
                <h2
                    className={'titleCreateSite'}
                >ایجاد سایت <span>.</span><span>.</span><span>.</span></h2>
                <img src={loadingImg}/>
            </div>
        );
    }
}

LoadingBox.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.object,
    className: PropTypes.string,
    onClose: PropTypes.func,
};

LoadingBox.defaultProps = {
    className: 'default'
};

export default LoadingBox;
