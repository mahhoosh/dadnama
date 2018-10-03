import React from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import * as routes from "routes/const";
//import {SPLASH} from 'Graphql';
import {
    LoadingOverlay
} from 'components';
import {
    LoadingBox
} from 'dadComponents';
import { SPLASH } from 'Graphql/SplashQuery';

class OnboardingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    render() {
        const { router } = this.context;
        return (
            <Query query={SPLASH}>
                {
                    ({ loading, error, data }) => {
                        if (loading) {
                            return (<div
                                className={'onboardingPage'}
                            >
                                <LoadingOverlay
                                    loading
                                    children={<LoadingBox />}
                                />;
                            </div>)
                        } else if (data) {
                            if (data.splash.user_template) {

                                window.theme=data.splash.user_template.template.name
                                window.location = window.site + routes.EDITOR
                                // router.history.push(routes.EDITOR)
                            } else {
                                debugger
                                // router.history.push(routes.HOME_tHEME)
                                window.location = window.site + routes.HOME_tHEME
                            }
                        }
                        else {
                            window.location = window.site + '/onboarding'
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
