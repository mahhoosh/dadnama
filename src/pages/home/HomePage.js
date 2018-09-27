import React from 'react';
import PropTypes from 'prop-types';
import src from 'assets/video/Weebly Website Builder- Create a Free Website, Store or Blog.mp4'
import {
    Tab,
    LinkBtn
} from 'components';
import {
    ThemePoster
} from 'dadComponents';

import ThemePosterImg from 'assets/images/img.jpg'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                        Made for creative entrepreneurs, by creative entrepreneurs.
                                    </h1>
                                    <div className="brand-message-text">
                                        Create your:
                                    </div>
                                    <div
                                        className="commerce-brand-message">
                                        <button className="masthead-dual-cta_button">
                                            Online Store
                                        </button>
                                        <button className="masthead-dual-cta_button website">
                                            Website
                                        </button>
                                    </div>
                                    <div className="brand-message-text">
                                        Launch and grow your business. We'll help you each step of the way.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-masthead_overlay"/>
                        <div className="js-masthead-overlay home-masthead_darken-overlay"
                        />
                        <div className="home-masthead__video-overlay"/>
                    </div>

                    <div className="masthead_video-container">
                        <video className="js-unveil js-masthead-video masthead__video" src={src} autoPlay loop
                               playsinline muted/>
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
                                A beautiful website starts&nbsp;here
                            </h1>
                            <h2>Weebly's powerful drag and drop
                                website builder and guided set up get you to the finish line faster, no coding
                                needed.</h2>
                        </div>
                        <Tab
                            tabs={tabsData}
                            currentTab={0}
                        />
                        <div
                            className={'more'}
                        >
                            <LinkBtn
                                title={'More Featured Themes'}
                                rounded
                                src={'/'}
                                outlineSecondary
                            />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

HomePage.propTypes = {};

export default HomePage;
