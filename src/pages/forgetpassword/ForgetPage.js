import React from 'react';
import PropTypes from 'prop-types';
import * as routes from "routes/const";
import { Mutation } from "react-apollo";
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

import { ForgotPassword } from 'Graphql/ForgotPasswordMutation';
import { VrifyUserMutation } from 'Graphql/VrifyUserMutation';

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
            level: 0,
            spinner: false
        };
        this.onClose = this.onClose.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onChangeValueUsername = this.onChangeValueUsername.bind(this);
        this.onChangeValuePassword = this.onChangeValuePassword.bind(this);
        this.onChangeValueCode = this.onChangeValueCode.bind(this);
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
    onChangeValueCode(e) {
        this.setState({
            code: e.target.value
        })
    }

    onClose() {
        const { router } = this.context;
        router.history.push(routes.APP_ROOT)
    }

    onClickLogin(e, data, ForgotPassword) {
        e.preventDefault();
        this.setState({
            spinner: true
        })
        //
        let variables = {}
        let level = 0
        var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!mailFormat.test(this.state.userName)) {
            level = 1;
            variables = { mobile: this.state.userName };
        } else {
            level = 2;
            variables = { email: this.state.userName };
        }
        debugger
        ForgotPassword({
            //TODO
            variables: variables

        }).then((data) => {

            debugger
            if (!data.data.ForgotPasswordMutation.error) {
                this.setState({
                    level: level,
                    spinner: false
                })
            } else {
                this.setState({
                    isAlertError: true,
                    spinner: false,
                    errText: data.data.ForgotPasswordMutation.description
                })

            }
        }).catch((err) => {
            debugger
            let text = this.gqlHandelError(err);
            this.setState({
                isAlertError: true,
                spinner: false,
                errorText: text
            })
        });


    }


    onClickVerify(e, data, VrifyUserMutation) {
        e.preventDefault();
        this.setState({
            spinner: true,
            errorText: ""
        })
        let variables = {};
        if (this.state.level === 1) {
            variables = {
                mobile: this.state.userName,
                password: this.state.password || 'a',
                code: this.state.code,
            }
        } else {
            variables = {
                email: this.state.userName,
                password: this.state.password || 'a',
                code: this.state.code,
            }
        }
        VrifyUserMutation({
            variables: variables

        }).then((data) => {
            debugger
            let param = data.data.VrifyUserMutation;
            debugger
            if (param.errors) {
                this.setState({
                    spinner: false,
                    errorText: "کد ارسالی صحیح نمی باشد"
                })
            } else {
                localStorage.setItem('token', param.api);
                // window.location.reload();
                window.location = window.site + '/onboarding'
                // const { router } = this.context;
                // router.history.push(routes.ON_BOARDING)
            }

        }).catch((err) => {
            debugger
            let er = this.gqlHandelError(err);
            this.setState({
                spinner: false,
                errorText: er
            })
        });
    }


    render() {
        const { level } = this.state;
        if (level >= 1) {
            return (
                <Mutation mutation={VrifyUserMutation}>
                    {(VrifyUserMutation, { data }) => (
                        <div className={'forgetPage'}>
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
                                    <h2 className="login-overlay-title">تغییر رمز عبور جدید  </h2>
                                    {level === 1 && <React.Fragment>
                                        <span className="p-title"> کد تایید به شماره موبایل شما ارسال شد</span>
                                        <span className="p-title"> جهت تغییر رمز عبور کد ارسالی را در فیلد زیر وارد کنید</span>
                                    </React.Fragment>}
                                    {level === 2 && <React.Fragment>
                                        <span className="p-title"> کد تایید به ایمیل شما ارسال شد</span>
                                        <span className="p-title"> در صورتی که در صتدوق پیام ها یافت نشد پوشه SPAM مراجعه کنید</span>
                                        <span className="p-title"> جهت تغییر رمز عبور  کد ارسالی را در فیلد زیر وارد کنید</span>
                                    </React.Fragment>}
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
                                                    <Input
                                                        value={this.state.code}
                                                        onChange={this.onChangeValueCode}
                                                        placeholder={'کد تایید'}
                                                    />
                                                    <Input
                                                        type="password"
                                                        value={this.state.password}
                                                        onChange={this.onChangeValuePassword}
                                                        placeholder={'رمز عبور'}
                                                    />

                                                    <div>
                                                        <LinkBtn
                                                            title={'تغییر رمز عبور جدید'}
                                                            rounded
                                                            onClick={(e) => this.onClickVerify(e, data, VrifyUserMutation)}
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
                                                    <div dangerouslySetInnerHTML={{ __html: this.state.errorText }} />
                                                </p>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    )}
                </Mutation>
            );
        }

        return (
            <Mutation mutation={ForgotPassword}>
                {(ForgotPasswordMutation, { data }) => (
                    <div className={'forgetPage'}>
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
                                <h2 className="login-overlay-title">یاد آوری کلمه عبور   </h2>
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
                                                    className="quick-switch">  پست الکترونیک یا شماره موبایل  </span>
                                                <Input
                                                    value={this.state.username}
                                                    onChange={this.onChangeValueUsername}
                                                    placeholder={'پست الکترونیک یا شماره موبایل'}
                                                />

                                                <span onClick={() => {
                                                    this.props.history.push("/login")
                                                }}
                                                    className="quick-switch">ورود به پنل کاربری</span>
                                                <div>
                                                    <LinkBtn
                                                        title={'یاد آوری کلمه عبور'}
                                                        rounded
                                                        onClick={(e) => this.onClickLogin(e, data, ForgotPasswordMutation)}
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
                                                <div dangerouslySetInnerHTML={{ __html: this.state.errorText }} />
                                            </p>
                                        }
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
