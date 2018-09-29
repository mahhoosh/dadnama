import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as routes from "routes/const";
import {
    Menu,
    LinkBtn,
    Modal
} from 'components'
import {
    Signup
} from 'dadComponents';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openLogin: false,
            OpenSignUp: false,
        };
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    onClickLogin() {
        const {router} = this.context;
        router.history.push(routes.LOGIN)
    }

    onCloseModal() {
        this.setState({
            isModalOpen: false
        });
        this.props.onCloseModal && this.props.onCloseModal();
    }

    onOpenModal() {
        this.setState({
            isModalOpen: true
        })
        this.props.onOpenModal && this.props.onOpenModal();
    }

    render() {
        return (
            <header
                className={'mainHeader'}
            >
                <div
                    className={'container'}
                >
                    <div
                        className={'content'}
                    >
                        <div
                            className={'logo'}
                        >
                            <Link
                                to={'/'}
                            >
                                {/* <img src={''} alt={'لوگو'}/> */}
                                دادنما
                            </Link>
                        </div>
                        <div>
                            <Menu/>
                        </div>
                        <div
                            className={'logIn'}
                        >
                            <div>
                                <LinkBtn
                                    title={'ثبت نام'}
                                    src={'/'}
                                    outlineSecondary
                                    onClick={this.onOpenModal}
                                />
                            </div>
                            <div
                                onClick={this.onClickLogin}
                            >
                                <LinkBtn
                                    title={'ورود'}
                                    src={'/'}
                                    linkSecondary
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.onCloseModal}
                    className={'signupModal'}
                >
                    <Signup
                        onClose={this.onCloseModal}
                    />
                </Modal>
            </header>
        );
    }
}

Header.contextTypes = {
    router: PropTypes.object
};
Header.propTypes = {};

export default Header;
