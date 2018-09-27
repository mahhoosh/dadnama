import React from 'react';
import PropTypes from 'prop-types';
import src from 'assets/video/Weebly Website Builder- Create a Free Website, Store or Blog.mp4'
import {
    DashCard,
    LinkBtn
} from 'components';

import ThemePosterImg from 'assets/images/img.jpg'

class FeedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div className={'feedPage'}>
                <div
                    className={'container'}
                >
                    <div
                        className={'row'}
                    >
                        <div
                            className={'col-lg-6'}
                        >
                            <DashCard
                                title={'PROMOTE'}
                                alertTitle={'You haven\'t sent any emails yet'}
                                alertText={'After you send an email, it will appear here. Use the "Promote" link at the top of the page to return to Weebly Promote'}
                            />
                        </div>
                        <div
                            className={'col-lg-6'}
                        >

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FeedPage.propTypes = {};

export default FeedPage;
