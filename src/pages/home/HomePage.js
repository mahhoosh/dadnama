import React from 'react';
import PropTypes from 'prop-types';
import src from 'assets/video/Weebly Website Builder- Create a Free Website, Store or Blog.mp4'
import {
    Tab,
    LinkBtn,
    Modal
} from 'components';
import {
    ThemePoster,
    Signup
} from 'dadComponents';


import ThemePosterImg from 'assets/images/img.jpg'
import ScrollableAnchor from 'react-scrollable-anchor'
import HomeThemesPage from './../homeThemes/HomeThemesPage'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onCloseModal = () => {
        this.setState({
            isModalOpen: false
        });

    }

    onOpenModal = () => {
        this.setState({
            isModalOpen: true
        })

    }
    render() {
        let tabsData = [
            {
                id: 1,
                title: 'توضیحات',
                content: <div
                    className={'row themeContent'}
                >
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                </div>
            },
            {
                id: 2,
                title: 'مشخصات',
                content: <div
                    className={'row themeContent'}
                >
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>

                </div>
            },
            {
                id: 3,
                title: 'نظرات',
                content: <div
                    className={'row themeContent'}
                >
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                    <div
                        className={'col-lg-6'}
                    >
                        <ThemePoster
                            src={ThemePosterImg}
                        />
                    </div>
                </div>
            }
        ];
        return (
            <div className={'homepage'}>
                <section>
                    <div className="masthead_content-dual">
                        <div
                            className="masthead_container">
                            <div className="masthead_center">
                                <div className="homepage-commerce-brand-message">
                                    <h1 className="masthead-dual-cta_header-text">
                                        با سایت ساز   دادنما در کمتر از ۲۰ دقیقه سایت بسازید !
                                    </h1>
                                    <div className="brand-message-text">
                                        همین حالا شروع کنید:
                                    </div>
                                    <div
                                        className="commerce-brand-message">
                                        <button onClick={this.onOpenModal} style={{cursor:"pointer"}} className=" masthead-dual-cta_button">
                                            <span className={'span'}>ساخت وب سایت</span>
                                        </button>
                                        {/* <button className="masthead-dual-cta_button website">
                                            Website
                                        </button> */}
                                    </div>
                                    <div className="brand-message-text">
                                        تـجربـه‌ای متفـاوت و خـاص با سـایت دادنما.

                                            سایت تخصصی  وکیل ها
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-masthead_overlay" />
                        <div className="js-masthead-overlay home-masthead_darken-overlay"
                        />
                        <div className="home-masthead__video-overlay" />
                    </div>

                    <div className="masthead_video-container">
                        <video className="js-unveil js-masthead-video masthead__video" src={src} autoPlay loop
                            playsinline muted />
                    </div>
                </section>

                <section
                    className={'homeThemes'}
                >
                    <div
                        className={'container'}
                    >
                        <div className="landing-page-title">
                            <h1>
                                دادنما می‌تونه یه شروع تازه و یا نقطه پیشرفت شما باشه
                            </h1>
                            <ScrollableAnchor id={'theme'}>
                                <h2>

                                    اگر  وکیل هستید همین حالا شروع به ساخت وب سایت خود بکنید و برند شخصی یا شرکت خود را معرفی کنید.
                                      و از بین غالب های زیر تم خود رو انتخاب کنید و سروع به ساخت وب سایت کنید
                            </h2>
                            </ScrollableAnchor>
                        </div>
                        <HomeThemesPage header />
                        <div
                            className={'more'}
                        >
                            <LinkBtn
                                title={'به زودی تم بیشتر'}
                                rounded
                                src={'/'}
                                outlineSecondary
                            />
                        </div>
                    </div>
                </section>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.onCloseModal}
                    className={'signupModal'}
                >
                    <Signup
                        onClose={this.onCloseModal}
                    />
                </Modal>
            </div>
        );
    }
}

HomePage.propTypes = {};

export default HomePage;
