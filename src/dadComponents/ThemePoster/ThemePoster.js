import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Mutation} from "react-apollo";
import {
    Button,
    LoadingOverlay
} from 'components';

import {
    LoadingBox
} from 'dadComponents';

import * as routes from "routes/const";
import {CHOICE_TEMPLATE} from 'Graphql/ChoiceTemplateMutation';

class ThemePoster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIframe: false
        };
        this.showIframe = this.showIframe.bind(this);
        this.closeIframe = this.closeIframe.bind(this);
        this.onClickEditTheme = this.onClickEditTheme.bind(this);
    }

    showIframe() {
        this.setState(
            {
                showIframe: true
            });
        document.body.classList.add('activeModal')
    }

    closeIframe() {
        this.setState(
            {
                showIframe: false
            });
        document.body.classList.remove('activeModal')
    }

    onClickEditTheme(e, data, ChoiceTemplate, id) {
        e.preventDefault();
        debugger
        ChoiceTemplate({
            variables: {
                template: id
            }
        }).then((data) => {
            debugger
            const {router} = this.context;
            router.history.push(routes.EDITOR);
        }).catch((res) => {
            debugger
            console.log('res', res)
        });
    }

    render() {
        const {
            src,
            alt,
            srcIframe,
            name,
            id
        } = this.props;

        return (
            <Mutation mutation={CHOICE_TEMPLATE}>
                {(ChoiceTemplate, {data}) => (
                    <form>
                        <div className='am-themePoster'>

                            {
                                this.state.showIframe &&
                                <div
                                    className={'iframeWrapper'}
                                >
                                    <div
                                        className={'iconWrapper'}
                                    >
                                        <div
                                            className={'icon'}
                                            onClick={this.closeIframe}
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
                                        <Button
                                            className={'editThemeBtn'}
                                            label={'ویرایش تم'}
                                            onClick={(e) => this.onClickEditTheme(e, data, ChoiceTemplate, id)}
                                        />
                                    </div>
                                    <div>
                                        {
                                            !this.state.showIframe ? <LoadingOverlay
                                                    loading
                                                    children={<LoadingBox/>}
                                                />
                                                :
                                                <iframe className={'vertical-theme-preview'}
                                                        src={srcIframe}
                                                        width="100%"
                                                />
                                        }
                                    </div>
                                </div>
                            }
                            <div className="home-themes_theme-container"
                                 onClick={this.showIframe}
                            >
                                <div className={`theme-poster`}>
                                    <div className="theme-poster_screenShot">
                                        <img className="theme-poster_screenShot-img" src={src}
                                             alt={alt}/>
                                        <div>
                                            <h4>{name}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Mutation>
        )
    }
}

ThemePoster.propTypes = {
    src: PropTypes.string,
    id: PropTypes.number,
    srcIframe: PropTypes.string,
    name: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object,
    showIframe: PropTypes.func,
};
ThemePoster.contextTypes = {
    router: PropTypes.object
};
export default ThemePoster;
