import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Mutation} from "react-apollo";
import {USER_STATISTIC} from 'Graphql/UserStatisticQuery';
import {CHANGE_EDUCATIONALES} from 'Graphql/ChangeEducationalesMutation';
import {
    Timeline,
    SeSelected,
    Thumb,
} from 'templates/trimatrixlab';
import {
    Edit
} from 'dadComponents';
import {
    Input,
    Tab,
    LinkBtn
} from 'components';

import ThemePosterImg from 'assets/images/02.jpg';

class SeStatistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueTitle: '',
            title: '',
            city_id: '',
            started_at: '',
            stopped_at: '',
            closeModal: true
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        //this.onClickEdit = this.onClickEdit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
    }

    onChangeTitle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onOpenModal() {
        this.setState({
            closeModal: true
        })
    }

    /*onClickEdit(e, data, change_educationales, id) {
        e.preventDefault();
        this.setState({
            closeModal: false
        })
        change_educationales({
            variables: {
                id: id,
                title: this.state.title,
                city_id: this.state.city_id,
                started_at: this.state.started_at,
                stopped_at: this.state.started_at
            }

        }).then((data) => {
            console.log('data', data)
        }).catch((res) => {
            console.log('res', res)
        });
    }*/

    render() {

        const {} = this.props;
        let inputData = [
            {
                id: 1,
                name: 'title',
                label: 'عنوان'
            },
            {
                id: 2,
                name: 'city_id',
                label: 'شهر'
            }
            ,
            {
                id: 3,
                name: 'started_at',
                label: 'تاریخ شروع'
            }
            ,
            {
                id: 4,
                name: 'stopped_at',
                label: 'تاریخ پایان'
            }
        ]

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
            <Query query={USER_STATISTIC}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (<div>
                                loading
                            </div>)
                        } else if (data) {
                            console.log('User_Statistic', data)
                            return <Mutation mutation={CHANGE_EDUCATIONALES}>
                                {(change_educationales, {dataM}) => (
                                    <form>
                                        <SeSelected
                                            plusIcon
                                            switchIcon
                                            modalChildren={
                                                <Edit
                                                    labelBtn={'افزودن'}
                                                    inputData={inputData}
                                                    onChange={this.onChangeTitle}
                                                    onClickEdit={(e) => this.onClickEdit(e, dataM, change_educationales)}
                                                />
                                            }
                                            closeModal={this.state.closeModal}
                                            onOpenModal={this.onOpenModal}
                                        >
                                            <div
                                                className={'container'}
                                            >
                                                <h2 className="title">آمار و پرونده ها</h2>
                                                <Tab
                                                    tabs={data.user_statistic}
                                                    currentTab={0}
                                                    tabContent={
                                                        <div
                                                            className={'row themeContent'}
                                                        >
                                                            <div
                                                                className={'col-lg-4'}
                                                            >
                                                                <Thumb
                                                                    src={ThemePosterImg}
                                                                />
                                                            </div>
                                                        </div>
                                                    }
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
                                        </SeSelected>
                                    </form>
                                )}
                            </Mutation>
                        }
                        else {
                            console.log('error', error);
                        }
                    }}
            </Query>
        )
    }
}

SeStatistic.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default SeStatistic;
