import React from 'react';
import PropTypes from 'prop-types';
import * as routes from "routes/const";
import { Mutation } from "react-apollo";
import {
    Tab,
    LinkBtn,
    Input
} from 'components';
import {
    ThemePoster
} from 'dadComponents';

import { USER_SIGNUP } from 'Graphql/UserSignupMutation';
import { VrifyUserMutation } from 'Graphql/VrifyUserMutation';

class Signup extends React.Component {

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
                        param.push(`${validation[key].join(',')}`)
                    }

                })
                // debugger
                // alert(param.join(','));
                return param.join(',')
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
            name: '',
            em_mb: '',
            email: '',
            mobile: '09332369461',
            level: 1
        };
        this.onClose = this.onClose.bind(this);
        this.onClickSignUp = this.onClickSignUp.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onClose() {
        const { router } = this.context;
        router.history.push(routes.APP_ROOT);
        this.props.onClose && this.props.onClose();
    }

    onClickSignUp(e, data, UserSigninMutation) {
        e.preventDefault();
        let mobile;
        let email;
        let level = 1;
        var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (mailFormat.test(this.state.em_mb)) {
            level = 3;
            email = this.state.em_mb
        } else {
            level = 2;
            mobile = this.state.em_mb
        }
        UserSigninMutation({
            variables: {
                username: this.state.username,
                name: this.state.name,
                mobile: mobile,
                email: email,
                password: this.state.password,
            }

        }).then((data) => {
            debugger
            let param = data.data.UserSignupMutation;
            if (param.error) {
                alert(param.description);
            } else {
                this.setState({
                    mobile: level === 2 ? mobile : email,
                    level: level
                })
            }
        }).catch((err) => {
            let er = this.gqlHandelError(err);
            alert(er);
        });
    }


    onClickVerify(e, data, VrifyUserMutation) {
        e.preventDefault();

        VrifyUserMutation({
            variables: {
                mobile: this.state.mobile,
                code: this.state.code,
            }

        }).then((data) => {
            debugger
            let param = data.data.VrifyUserMutation;
            debugger
            if (param.errors) {
                alert("کد ارسالی صحیح نمی باشد");
            } else {
                localStorage.setItem('token', param.api);
                window.location.reload();
                // const { router } = this.context;
                // router.history.push(routes.ON_BOARDING)
            }

        }).catch((err) => {
            let er = this.gqlHandelError(err);
            alert(er);
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
                name: 'name',
                label: 'نام'
            },
            {
                id: 2,
                name: 'username',
                label: 'نام کاربری'
            }
            ,
            {
                id: 3,
                name: 'em_mb',
                label: ' ایمیل یا موبایل'
            }
            ,
            {
                id: 5,
                name: 'password',
                label: 'رمز ورود'
            }
        ]

        let inputDataMobile = [

            {
                id: 3,
                name: 'mobile',
                label: 'تغییر موبایل'
            }
            ,
            {
                id: 5,
                name: 'code',
                label: 'کد ارسال'
            }
        ]

        const {
            onClose
        } = this.props;
        const {
            level
        } = this.state;


        if (level === 2) {
            return (
                <Mutation mutation={VrifyUserMutation}>
                    {(VrifyUserMutation, { data }) => (
                        <div className={'signUp'}>
                            <form>
                                <div className={'loginContainer'}  >
                                    <h5 className="login-overlay-title">تایید موبایل</h5>
                                    <span className="quick-switch">یک کد به شماره موبایل شما ارسال شد</span>

                                    <div className={'row'} >
                                        <div className={'col-lg-12'} >
                                            <div className={'leftCol'}  >
                                                <div   >
                                                    <Input
                                                        value={this.state['mobile']}
                                                        label={'موبایل'}
                                                        name={'mobile'}
                                                        onChange={(e) => this.onChangeInput(e)}
                                                    />
                                                    {/* <LinkBtn
                                                        title={'تغییر موبایل'}
                                                        rounded
                                                        src={'#'}
                                                        primary
                                                        onClick={(e) => this.onClickChangeMobile(e, data, UserSigninMutation)}
                                                    /> */}

                                                </div>
                                                <Input
                                                    value={this.state['code']}
                                                    label={'کد ارسالی'}
                                                    name={'code'}
                                                    onChange={(e) => this.onChangeInput(e)}
                                                />
                                                <div   >

                                                    <LinkBtn
                                                        title={'ارسال کد'}
                                                        rounded
                                                        src={'#'}
                                                        primary
                                                        onClick={(e) => this.onClickVerify(e, data, VrifyUserMutation)}
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

        if (level === 3) {
            return (
                <div className={'signUp'}>
                    <form>
                        <div className={'loginContainer'}  >
                            <h5 className="login-overlay-title">تایید ایمیل</h5>
                            <span className="quick-switch">ثبت نام شما با موفقیت انجام شد </span>
                            <span className="quick-switch">یک ایمیل حاوی لینک تاید به ایمیل شما ارسال شد لطفا ایمیل خود را چک کنید </span>
                            <div   >

                                <LinkBtn
                                    title={'متوجه شدم '}
                                    rounded
                                    src={'#'}
                                    primary
                                    onClick={(e) => this.onClose()}
                                />
                            </div>

                        </div>
                    </form>
                </div>
            );
        }


        return (
            <Mutation mutation={USER_SIGNUP}>
                {(UserSigninMutation, { data }) => (
                    <div className={'signUp'}>
                        <form>
                            <div className={'loginContainer'}  >
                                <h5 className="login-overlay-title">ثبت نام</h5>
                                <span className="quick-switch">اطلاعات خود رو به صورت کامل وارد کنید</span>

                                <div className={'row'} >
                                    <div className={'col-lg-12'} >
                                        <div className={'leftCol'}  >
                                            {
                                                inputData && inputData.map((data, index) => {
                                                    return <Input
                                                        label={data.label}
                                                        name={data.name}
                                                        onChange={(e) => this.onChangeInput(e)}
                                                    />
                                                })
                                            }

                                            <div   >

                                                <LinkBtn
                                                    title={'ثبت نام'}
                                                    rounded
                                                    src={'#'}
                                                    primary
                                                    onClick={(e) => this.onClickSignUp(e, data, UserSigninMutation)}
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
