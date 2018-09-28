import React from 'react';
import PropTypes from 'prop-types';
import src from 'assets/video/Weebly Website Builder- Create a Free Website, Store or Blog.mp4'
//import Iframe from 'react-iframe';
import { Query } from "react-apollo";
import { templates } from 'Graphql/ListTemplat';
import {
    ThemePoster
} from 'dadComponents';
import {
    Spinner
} from 'components';

import ThemePosterImg from 'assets/images/img.jpg'

class HomeThemesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showIframe = this.showIframe.bind(this)
    }

    showIframe() {
        this.setState(
            {
                showIframe: false
            });
    }

    render() {

        return (
            <Query query={templates}>
                {
                    ({ loading, error, data }) => {
                        if (loading) {
                            return <div> </div>
                        } else if (data) {
                            return <div className={'homeThemesPage'}>

                                {!(this.props.header) && <h2 className={'title'}>انتخاب تم</h2>}
                                <section
                                    className={'homeThemes'}
                                >
                                    <div
                                        className={'container'}
                                    >
                                        <div
                                            className={'row themeContent'}
                                        >
                                            {
                                                data.templates.map((data, index) => {
                                                    return <div
                                                        className={'col-lg-6'}
                                                    >
                                                        <ThemePoster
                                                            id={data.id}
                                                            showIframe={this.showIframe}
                                                            src={window.base_image+data.path}
                                                            // src={ThemePosterImg}
                                                            srcIframe={data.link}
                                                            name={data.name}
                                                        />
                                                    </div>
                                                })
                                            }
                                            {console.log('data splash', data.templates)}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        } else {
                            console.log('error', error);
                        }
                    }
                }
            </Query>
        );
    }
}

HomeThemesPage.propTypes = {};

export default HomeThemesPage;
