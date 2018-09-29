import React from 'react';

const Spinners = (props) => {
    return (
        <div className={`LoadingOverlay ${props.loading ? '-loading' : '-loading'}`}>
            <div
                className={'spinnerRapper'}
            >
                <section className="talign-center">
                    <div className="spinner spinner--steps icon-spinner" aria-hidden="true"/>
                    <div className="spinner icon-spinner-2" aria-hidden="true"/>
                    <div className="spinner icon-spinner-3" aria-hidden="true"/>
                    <div className="spinner icon-spinner-4" aria-hidden="true"/>
                    <div className="spinner icon-spinner-5" aria-hidden="true"/>
                    <div className="spinner icon-spinner-6" aria-hidden="true"/>
                    <div className="spinner spinner--steps2 icon-spinner-7" aria-hidden="true"/>
                </section>
            </div>
        </div>
    );
};

export default Spinners;
