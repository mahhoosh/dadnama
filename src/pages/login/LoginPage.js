import React from 'react';
import PropTypes from 'prop-types';
import * as routes from "routes/const";
import {Mutation} from "react-apollo";
import {
    Tab,
    LinkBtn,
    Input,
    Alert,
    Spinners
} from 'components';
import {
    ThemePoster
} from 'dadComponents';

//import ThemePosterImg from 'assets/images/img.jpg'
//import Header from "../../common/header/Header";

import {USER_SIGNIN} from 'Graphql/UserSigninMutation';

class LoginPage extends React.Component {

    gqlHandelError = (err) => {
        // debugger
        const errors = err.graphQLErrors[0];
        if (errors) {
            const type = errors.message;
            if (type == "validation") {
                // debugger
                const validation = errors.validation
                debugger
                const keys = Object.keys(validation);
                let param = [];
                keys.map(key => {
                    if (validation[key]) {
                        param.push(`${validation[key].join('<br />')}`)
                    }

                })
                // debugger
                // alert(param.join(','));
                return param.join('<br />')
            }
        }
        // debugger
        // alert(type);
        return "اطلاعات وارد شده صحیح نمی  باشد";
    }

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isAlert: false,
            errorText: '',
            spinner: false
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
        this.setState({
            spinner: true
        })
        UserSigninMutation({
            //TODO
            variables: {
                username: this.state.userName,
                password: this.state.password
            }

        }).then((data) => {
            this.setState({
                // isAlert: true,
                spinner: false
            })
            debugger
            if (data.data.UserSigninMutation.api) {
                localStorage.setItem('token', data.data.UserSigninMutation.api)
                debugger
                window.location = window.site + '/onboarding'
            } else {
                this.setState({
                    isAlertError: true,
                    spinner: false,
                    errText: "نام کاربری یا رمز عبور اشتباه می باشد"
                })
                //alert("نام کاربری یا رمز عبور اشتباه می باشد");
            }

            debugger
            //  const { router } = this.context;
            // router.history.push(routes.ON_BOARDING)
        }).catch((err) => {
            debugger
            let text = this.gqlHandelError(err);
            //alert(text);
            this.setState({
                isAlertError: true,
                spinner: false,
                errorText: text
            })
        });

        // let _this = this
        // setTimeout(function () {
        //     _this.setState({
        //         isAlert: false,
        //         isAlertError: false
        //     });
        // }, 3000);
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
                                    {/* logo */}
                                </div>
                                <h2 className="login-overlay-title">ورود به دادنما </h2>
                                <div
                                    className={'row'}
                                >
                                    <div
                                        className={'col-lg-12 leftWrapper'}
                                    >
                                        <div
                                            className={'leftRight'}
                                        >
                                            <div className={'leftCol'}>
                                                <span
                                                    className="quick-switch"> ورود با ایمیل و موبایل ونام کاربری</span>
                                                <Input
                                                    value={this.state.username}
                                                    //TODO
                                                    onChange={this.onChangeValueUsername}
                                                    placeholder={'ایمیل یا موبایل یا نام کاربری'}
                                                />
                                                <Input
                                                    value={this.state.password}
                                                    onChange={this.onChangeValuePassword}
                                                    placeholder={'رمز عبور'}
                                                    type={'password'}
                                                />
                                                {/* <span
                                                className="quick-switch">Don't have an account? Click here to sign up.</span> */}
                                                <div>
                                                    <LinkBtn
                                                        title={'ورود'}
                                                        rounded
                                                        onClick={(e) => this.onClickLogin(e, data, UserSigninMutation)}
                                                        src={'#'}
                                                        primary
                                                    />
                                                    <Spinners
                                                        loading={this.state.spinner}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*   <div className={'col-lg-6'}>
                                        <div className={'leftCol'}>
                                            <span
                                                className="quick-switch"> ورود با نام کاربری </span>
                                            <Input
                                                value={this.state.username}
                                                onChange={this.onChangeValueUsername}
                                                placeholder={'نام کاربری'}
                                            />
                                            <Input
                                                value={this.state.password}
                                                onChange={this.onChangeValuePassword}
                                                placeholder={'رمز عبور'}
                                            />
                                             <span
                                                className="quick-switch">Don't have an account? Click here to sign up.</span>
                                            <div>
                                                <LinkBtn
                                                    title={'ورود'}
                                                    rounded
                                                    onClick={(e) => this.onClickLogin(e, data, UserSigninMutation)}
                                                    src={'#'}
                                                    primary
                                                />
                                                <Spinners
                                                    loading={this.state.spinner}
                                                    //loading={true}
                                                />
                                            </div>

                                        </div>
                                    </div>*/}
                                    <div className={'col-lg-12'}>
                                        <p
                                            className={'errorText'}
                                        >
                                            {
                                                this.state.errText
                                            }
                                        </p>
                                        {
                                            this.state.errorText && <p
                                                className={'errorText'}

                                            >
                                                <div dangerouslySetInnerHTML={{__html: this.state.errorText}}/>
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* {
                                this.state.isAlert && <Alert

                                    alertText={'تغییرات شما با موفقیت اعمال شد'}
                                />
                            }*/}
                            {/*  {
                                this.state.isAlertError && <Alert
                                    alertText={this.state.errorText ? this.state.errorText : 'خطا'}
                                />
                            }*/}
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
