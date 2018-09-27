import React from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import * as routes from "routes/const";
//import {SPLASH} from 'Graphql';
import {
    LoadingOverlay
} from 'components';
import {SPLASH} from 'Graphql/SplashQuery';
import loadingImg from 'assets/images/loading-after-signup.png';

class OnboardingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    render() {
        const {router} = this.context;
        return (
            <Query query={SPLASH}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (<div
                                className={'onboardingPage'}
                            >
                                <LoadingOverlay
                                    loading
                                    children={<div
                                        className={'loadingWrapper'}
                                    >
                                        <h2
                                            className={'title'}
                                        >ایجاد سایت <span>.</span><span>.</span><span>.</span></h2>
                                        <img src={loadingImg}/>
                                    </div>}
                                />;
                            </div>)
                        } else if (data) {
                            console.log('data splash', data.splash.user_template.template);
                            (!data.splash.user_template.template) ?
                                router.history.push(routes.EDITOR) :
                                router.history.push(routes.HOME_tHEME)
                        }
                        else {
                            console.log('error', error);
                        }
                    }}
            </Query>
        );
    }
}

OnboardingPage.contextTypes = {
    router: PropTypes.object
};
OnboardingPage.propTypes = {};

export default OnboardingPage;
