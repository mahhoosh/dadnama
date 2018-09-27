import React from 'react';

const Spinner = (props) => {
    return (
        <div className={`LoadingOverlay ${props.loading ? '-loading' : '-loading'}`}>
            <div
                className={'spinnerRapper'}
            >
                {/*<i className="fa fa-refresh fa-spin spinner" aria-hidden="true"/>*/}
                <i className="fa fa-circle-o-notch fa-spin"/>
                {/*<i className="fa fa-spinner fa-spin"/>*/}
            </div>
        </div>
    );
};

export default Spinner;
