import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
    Tab,
    LinkBtn
} from 'components';

import {
    Thumb,
    Timeline,
    Selected,
    SeProfile,
    SeAboutMe,
    Skills,
    SeResume,
    SeEducationales,
    SeSkills,
    SeAbout,
    SeStatistic,
    SeNetworks,
    SeStatistics
} from 'templates/trimatrixlab';
import {
    Edit
} from 'dadComponents';
import ThemePosterImg from 'assets/images/02.jpg';
import profileImg from 'assets/images/hero.png';

class TrimatrixlabPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let tabsData = [
            {
                id: 1,
                title: 'all',
                content: <div
                    className={'row themeContent'}
                >
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                </div>
            },
            {
                id: 2,
                title: 'Branding',
                content: <div
                    className={'row themeContent'}
                >
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>

                </div>
            },
            {
                id: 3,
                title: 'Branding',
                content: <div
                    className={'row themeContent'}
                >
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-4'}
                    >
                        <Thumb
                            src={ThemePosterImg}
                        />
                    </div>
                </div>
            }
        ];

        return (
            <div className={'trimatrixlabPage'}>

                <header
                    className={'header'}
                >
                    <div className="header-background section"/>
                    {/*<div
                        className={'container'}
                    >
                        <div
                            className={'row'}
                        >
                            <div
                                className={'col-lg-12 headerContent'}
                            >
                                <div
                                    className={'logo'}
                                >
                                    <Link
                                        to={'/'}
                                    >
                                         <img src={''} alt={'لوگو'}/>
                                        <h3
                                            className="footer-brand mb-sm-30">Ario<span>X</span>
                                        </h3>
                                    </Link>
                                </div>
                                <nav
                                    className={'menu'}
                                >
                                    <Link
                                        to={'/'}
                                    >
                                        درباره من
                                    </Link>
                                    <Link
                                        to={'/'}
                                    >
                                        سوابق تحصیلی
                                    </Link>
                                    <Link
                                        to={'/'}
                                    >
                                        مهارت ها
                                    </Link>
                                    <Link
                                        to={'/'}
                                    >
                                        سوابق کاری
                                    </Link>
                                    <Link
                                        to={'/'}
                                    >
                                        پرونده ها
                                    </Link>
                                    <Link
                                        to={'/'}
                                    >
                                        آمار
                                    </Link>
                                    <Link
                                        to={'/'}
                                    >
                                        تماس با ما
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </div>*/}
                </header>
                <section id="about" className="about section-padding border-bottom">
                    <SeAbout/>
                </section>

                <section
                    className={'section-padding border-bottom seTimeline'}
                >
                    <SeEducationales/>
                </section>

                <section className={'border-bottom'}>
                    <SeSkills/>
                </section>

                <section
                    className={'section-padding border-bottom seResume'}
                >
                    <SeResume/>
                </section>

                <section
                    className={'portfolio-filter border-bottom'}
                >
                    <SeStatistics/>
                </section>

                <section className=" contactMe section-padding">

                    <div className="container">


                        <h2 className="title">تماس با ما</h2>


                        <div className="row">

                            <div className="col-md-8 contact">


                                <form id="contact-form" noValidate="novalidate">

                                    <div className="row">

                                        <div className="col-md-6">
                                            <input type="text" id="name" className="form-control" placeholder="نام"/>
                                        </div>
                                        <div className="col-md-6">

                                            <input type="text" id="subject" className="form-control" placeholder=""/>
                                        </div>
                                        <div className="col-md-12">
                                            <input type="email" id="email" className="form-control"
                                                   placeholder="ایمیل"/>
                                        </div>
                                        <div className="col-md-12">
                                            <textarea className="form-control" cols="30" rows="8"
                                                      placeholder="پیام"/>
                                        </div>
                                        <div className="col-md-12">
                                            {/*<h6 className="success-content">
                                                <i
                                                    className="ion-android-checkbox-outline"/>Your message has been sent
                                                successfully.</h6>
                                            <h6 className="error-content"><i className="ion-alert-circled"/>Opps!
                                                Please fix the error.</h6>*/}
                                        </div>
                                        <div className="col-md-12 text-center btnWrapper">
                                            <button id="submit" className="btn btn-default">ارسال</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>


                </section>
                <footer className="page-footer border-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-6">
                                <Link
                                    className="easing"
                                    to={'/'}
                                >
                                    <h3 className="footer-brand mb-sm-30">Ario<span>X</span></h3>
                                </Link>
                            </div>


                            <div className="col-md-6">
                                <ul className="footer-social mb-sm-30">
                                    <li><Link
                                        to={'/'}
                                    >
                                        <i className="fa fa-twitter"/>
                                    </Link>
                                    </li>
                                    <li><Link
                                        to={'/'}
                                    >
                                        <i className="fa fa-facebook-f"/>
                                    </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <hr className="mtb-30"/>
                    </div>

                    <div className="container">
                        <div className="row">

                            <div className="col-md-12">


                                <div className="text-lg text-center copyright">
                                    <span className="text-sm">کلیه حقوق این وبسایت متعلق به دادنما میباشد</span>
                                </div>


                            </div>

                        </div>

                    </div>

                </footer>
            </div>
        );
    }
}

TrimatrixlabPage.propTypes = {};

export default TrimatrixlabPage;
