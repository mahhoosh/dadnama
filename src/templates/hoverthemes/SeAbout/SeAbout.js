import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Mutation} from "react-apollo";
import {USER_ABOUT} from 'Graphql/UserAboutQuery';
import {EDIT_ABOUT_TEMPLATE} from 'Graphql/ChangeAboutMutation';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Utils from 'utils/Utils';

import {
    Skills,
    SeSelected,
    SeProfile,
    SeAboutMe,
} from 'templates/hoverthemes';
import {
    Edit
} from 'dadComponents';
import {
    Input,
    Spinner,
    Alert,
    Spinners
} from 'components';
import profileImg from 'assets/images/hero.png';

class SeAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closeModal: true,
            title: '',
            first_name: '',
            last_name: '',
            text: '',
            description: '',
            spinner: false
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
    }

    onChangeTitle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onOpenModal(data) {
        this.setState({
            closeModal: true,
            title: data.user_about.title,
            first_name: data.user_about.first_name,
            last_name: data.user_about.last_name,
            text: data.user_about.text,
            description: data.user_about.description,
        });
    }

    onClickEdit(e, data, edit_about_template) {
        e.preventDefault();

        this.setState({
            spinner: true
        });

        edit_about_template({
            variables: {
                title: this.state.title,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                text: this.state.text,
                description: this.state.description,
            }

        }).then((data) => {
            console.log('data', data);
            toast.success("تغییرات شما با موفقیت اعمال شد");
            this.setState({
                closeModal: false,
                spinner: false
            })
        }).catch((err) => {
            this.setState({
                spinner: false
            })
            console.log('res', err)
            toast.error(Utils.gqlHandelError(err));
        });
    }

    render() {
        const {} = this.props;
        let inputData = [
            {
                id: 1,
                name: 'title',
                label: 'عنوان',
                value: this.state.title
            },
            {
                id: 2,
                name: 'first_name',
                label: 'نام',
                value: this.state.first_name
            },
            {
                id: 3,
                name: 'last_name',
                label: 'نام خانوادگی',
                value: this.state.last_name
            }
        ]
        let TextAriaData = [

            {
                id: 1,
                name: 'description',
                label: 'ادامه درباره ما',
                value: this.state.description
            },
            {
                id: 2,
                name: 'text',
                label: 'متن درباره من',
                value: this.state.text
            }
        ]

        return (
            <Query query={USER_ABOUT}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (<div>
                                <Spinner/>
                            </div>)
                        } else if (data) {
                            return <Mutation mutation={EDIT_ABOUT_TEMPLATE}>
                                {(edit_about_template) => (
                                    <form
                                        className={'seAbout-hoverthemes'}
                                    >
                                        <SeSelected
                                            editIcon
                                            modalChildren={
                                                <Edit
                                                    title={'ویرایش'}
                                                    labelBtn={'ویرایش'}
                                                    inputData={inputData}
                                                    TextAriaData={TextAriaData}
                                                    onChange={this.onChangeTitle}
                                                    onClickEdit={(e) => this.onClickEdit(e, data, edit_about_template)}
                                                />
                                            }
                                            closeModal={this.state.closeModal}
                                            onOpenModal={() => this.onOpenModal(data)}
                                        >
                                            <article
                                                className={'seProfileWrapper intro bg-paper'}
                                            >
                                                <div className="intro-content">
                                                    <div className="container">
                                                        <SeProfile
                                                            photo={'actor'}
                                                            name={data.user_about.first_name}
                                                            lastName={data.user_about.last_name}
                                                            description={data.user_about.title}
                                                            src={profileImg}
                                                            linkTo={'/'}
                                                        />
                                                    </div>
                                                </div>
                                            </article>

                                            <article className="seAboutMeWrapper">
                                                <div className="container">
                                                    <SeAboutMe
                                                        descriptionMission={data.user_about.text}
                                                        name={data.user_about.first_name}
                                                        lastName={data.user_about.last_name}
                                                        descriptionMe={data.user_about.description}
                                                    />
                                                </div>
                                            </article>
                                        </SeSelected>

                                        <Spinners
                                            loading={this.state.spinner}
                                        />

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

SeAbout.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default SeAbout;
