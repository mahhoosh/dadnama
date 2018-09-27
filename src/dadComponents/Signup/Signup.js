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

import {USER_SIGNUP} from 'Graphql/UserSignupMutation';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            name: '',
            email: '',
            mobile: ''
        };
        this.onClose = this.onClose.bind(this);
        this.onClickSignUp = this.onClickSignUp.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onClose() {
        const {router} = this.context;
        router.history.push(routes.APP_ROOT);
        this.props.onClose && this.props.onClose();
    }

    onClickSignUp(e, data, UserSigninMutation) {
        e.preventDefault();
        UserSigninMutation({
            variables: {
                username: this.state.userName,
                name: this.state.name,
                mobile: this.state.mobile,
                email: this.state.email,
                password: this.state.password,
            }

        }).then((data) => {
            localStorage.setItem('token', data.UserSigninMutation.api);
            console.log('data', data)
            //const {router} = this.context;
            //router.history.push(routes.ON_BOARDING)
        }).catch((err) => {
            console.log('res', err)
        });
    }

    onChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        let inputData = [
            {
                id: 1,
                name: 'userName',
                label: 'نام'
            },
            {
                id: 2,
                name: 'name',
                label: 'نام کاربری'
            }
            ,
            {
                id: 3,
                name: 'mobile',
                label: 'موبایل'
            }
            ,
            {
                id: 4,
                name: 'email',
                label: 'ایمیل'
            }
            ,
            {
                id: 5,
                name: 'password',
                label: 'رمز ورود'
            }
        ]
        const {
            onClose
        } = this.props;
        return (
            <Mutation mutation={USER_SIGNUP}>
                {(UserSigninMutation, {data}) => (
                    <div className={'signUp'}>
                        <form>
                            <div
                                className={'loginContainer'}
                            >
                                <h5 className="login-overlay-title"> Sign up</h5>
                                <h5 className="login-overlay-title">Log in</h5>
                                <div
                                    className={'row'}
                                >
                                    <div
                                        className={'col-lg-12'}
                                    >
                                        <div
                                            className={'leftRight'}
                                        >
                                            <div
                                                className={'col-lg-12'}
                                            >
                                                <LinkBtn
                                                    title={'Log In'}
                                                    rounded
                                                    src={''}
                                                    primary
                                                />
                                            </div>
                                            <div className={'col-lg-12'}>
                                                <LinkBtn
                                                    className={'googleLogin'}
                                                    title={'Log In'}
                                                    rounded
                                                    src={''}
                                                    primary
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={'col-lg-12'}
                                    >
                                        <div
                                            className={'leftCol'}
                                        >
                                            {
                                                inputData && inputData.map((data, index) => {
                                                    return <Input
                                                        label={data.label}
                                                        name={data.name}
                                                        onChange={(e) => this.onChangeInput(e)}
                                                    />
                                                })
                                            }
                                            <span
                                                className="quick-switch">Don't have an account? Click here to sign up.</span>
                                            <div
                                                onClick={(e) => this.onClickSignUp(e, data, UserSigninMutation)}
                                            >

                                                <LinkBtn
                                                    title={'ورود'}
                                                    rounded
                                                    src={'#'}
                                                    primary
                                                    onClick={this.onClose}
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

Signup.contextTypes = {
    router: PropTypes.object,
    onClose: PropTypes.func,
};
Signup.propTypes = {};

export default Signup;
