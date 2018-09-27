import React from 'react';
import PropTypes from 'prop-types';
import OnboardingPage from "../../pages/onboarding/OnboardingPage";

const LoadingOverlay = (props) => {
    return (
        <div className={`LoadingOverlay ${props.loading ? '-loading' : null}`}>
            {props.loadingImg && <img src={props.loadingImg} alt='loading...'/>}
            {props.children}
        </div>
    );
};
LoadingOverlay.propTypes = {
    loadingImg: PropTypes.string,
    children: PropTypes.node,
};
export default LoadingOverlay;
