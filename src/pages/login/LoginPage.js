import React from 'react';
import PropTypes from 'prop-types';
import * as routes from "routes/const";
import {Mutation} from "react-apollo";
import {
    Tab,
    LinkBtn,
    Input
} from 'components';
import {
    ThemePoster
} from 'dadComponents';

//import ThemePosterImg from 'assets/images/img.jpg'
//import Header from "../../common/header/Header";

import {USER_SIGNIN} from 'Graphql/UserSigninMutation';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
        this.onClose = this.onClose.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onChangeValueUsername = this.onChangeValueUsername.bind(this);
        this.onChangeValuePassword = this.onChangeValuePassword.bind(this);
    }

    onChangeValueUsername(e) {
        this.setState({
            userName: e.target.value
        })
    }

    onChangeValuePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onClose() {
        const {router} = this.context;
        router.history.push(routes.APP_ROOT)
    }

    onClickLogin(e, data, UserSigninMutation) {
        e.preventDefault();
        UserSigninMutation({
            //TODO
            variables: {
                username: this.state.userName,
                password: this.state.password
            }

        }).then((data) => {
            localStorage.setItem('token', data.data.UserSigninMutation.api)
            const {router} = this.context;
            router.history.push(routes.ON_BOARDING)
        }).catch((res) => {

        });
    }

    render() {

        return (
            <Mutation mutation={USER_SIGNIN}>
                {(UserSigninMutation, {data}) => (
                    <div className={'loginPage'}>
                        <form>
                            <div
                                className={'loginContainer'}
                            >
                                <div
                                    className="_close"
                                    onClick={this.onClose}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                         viewBox="0 0 212.982 212.982" width="512px" height="512px"
                                         aria-labelledby="title">
                                        <path
                                            d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                                            id="path-1"
                                            fill={this.props.color}
                                        >
                                        </path>
                                    </svg>
                                </div>
                                <div
                                    className={'logo'}
                                >
                                    logo
                                </div>
                                <h2 className="login-overlay-title">Log in </h2>
                                <div
                                    className={'row'}
                                >
                                    <div
                                        className={'col-lg-6'}
                                    >
                                        <div
                                            className={'leftRight'}
                                        >
                                            <LinkBtn
                                                title={'Log In'}
                                                rounded
                                                src={''}
                                                primary
                                            />

                                            <LinkBtn
                                                className={'googleLogin'}
                                                title={'Log In'}
                                                rounded
                                                src={''}
                                                primary
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={'col-lg-6'}
                                    >
                                        <div
                                            className={'leftCol'}
                                        >
                                            <Input
                                                value={this.state.username}
                                                //TODO
                                                onChange={this.onChangeValueUsername}
                                                placeholder={'username'}
                                            />
                                            <Input
                                                value={this.state.password}
                                                onChange={this.onChangeValuePassword}
                                                placeholder={'password'}
                                            />
                                            <span
                                                className="quick-switch">Don't have an account? Click here to sign up.</span>
                                            <div
                                                onClick={(e) => this.onClickLogin(e, data, UserSigninMutation)}
                                            >

                                                <LinkBtn
                                                    title={'ورود'}
                                                    rounded
                                                    src={'#'}
                                                    primary
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </Mutation>
        );
    }
}

LoginPage.contextTypes = {
    router: PropTypes.object
};
LoginPage.propTypes = {};

export default LoginPage;
