import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Link} from 'react-router-dom';
import {USER_PHOTO} from 'Graphql/UserPhotoQuery';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Utils from 'utils/Utils';

import {
    Selected,
    SeSelected,
    SeAboutMe,
    SeNetworks
} from 'templates/trimatrixlab';
import {
    Edit
} from 'dadComponents';
import {
    Spinners
} from 'components';

class SeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closeModal: true,
            dataFile: {},
            spinner: false
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.dataFile = '';
    }

    onOpenModal() {
        this.setState({
            closeModal: true
        });
    }

    onCropComplete(croppedAreaPixels) {
        let dataFile = new FormData();
        dataFile.append('photo', croppedAreaPixels);
        console.log('croppedArea=====999 profile', croppedAreaPixels)
        this.setState({
            dataFile: dataFile
        });
    }

    onClickEdit(e) {
        e.preventDefault();

        this.setState({
            spinner: true
        });

        axios.post(`${window.base_axios}upload/image/${this.props.photo}`, this.state.dataFile
            , {
                headers: {
                    Apigkey: localStorage.getItem('token')
                }
            }).then(res => {
            toast.success("تغییرات شما با موفقیت اعمال شد");
            this.setState({
                closeModal: false,
                spinner: false
            });
            console.log(res.data);
        })
            .catch((error) => {
                this.setState({
                    spinner: false
                });
                toast.error(Utils.gqlHandelError(error));
                console.log('error', error);
            });

    }

    render() {
        const {
            direction, photo,
            description,
            name,
            linkTo,
            lastName,
            descriptionAboutMe,
            text
        } = this.props;

        return (
            <Query query={USER_PHOTO}
                   variables={{
                       photo: photo
                   }}
            >
                {({data, fetchMore}) => (
                    <div
                        className={'SeProfile-wrapper-trimatrixlab'}
                    >
                        <div className={`bg-paper ${direction}`}>

                            <div className="infoProfileWrapper">
                                <div
                                    className={'intro-title-wrapper'}
                                >
                                    <h3 className="intro-title">{name}{lastName}</h3>
                                    <h4 className="intro-subtitle">{description}</h4>
                                    {/* <Link
                                    className="link animated easing"
                                    to={linkTo}
                                >
                                    درباره من
                                </Link>*/}
                                    <SeAboutMe
                                        descriptionMission={text}
                                        name={name}
                                        lastName={lastName}
                                        descriptionMe={descriptionAboutMe}
                                    />
                                    <SeNetworks/>
                                </div>
                            </div>
                            <div className="imgProfileWrapper">
                                <SeSelected
                                    editIcon
                                    modalChildren={
                                        <Edit
                                            srcImgCrp={data.user_photo ? window.base_image + data.user_photo.path : ''}
                                            title={'ویرایش'}
                                            labelBtn={'ویرایش'}
                                            cropper
                                            fileUpload
                                            onCropComplete={this.onCropComplete}
                                            onClickEdit={(e) => this.onClickEdit(e)}
                                        />
                                    }
                                    closeModal={this.state.closeModal}
                                    onOpenModal={this.onOpenModal}
                                >
                                    {console.log('SeProfile===== 2', data.user_photo)}
                                    <img className={'imgProfile'}
                                         src={data.user_photo ? window.base_image + data.user_photo.path : ''}
                                         alt={''}/>
                                    <div className="slant"/>

                                    <div className="addBtn">
                                        {/* <i className="fa fa-plus-circle"/>*/}
                                        <i className="fa fa-plus"/>
                                    </div>

                                </SeSelected>
                            </div>
                            <user_photo
                                entries={data.user_photo || {}}
                                onLoadMore={() =>
                                    fetchMore({
                                        variables: {
                                            photo: data.user_photo.photo_type.label
                                        },
                                        updateQuery: (prev, {fetchMoreResult}) => {
                                            debugger
                                            if (!fetchMoreResult) return prev;
                                            return Object.assign({}, prev, {
                                                user_photo: [...prev.user_photo, ...fetchMoreResult.user_photo]
                                            });
                                        }
                                    })
                                }
                            />
                        </div>

                        <Spinners
                            loading={this.state.spinner}
                        />

                    </div>
                )}

            </Query>
        )
    }
}

SeProfile.propTypes = {
    direction: PropTypes.string,
    description: PropTypes.string,
    descriptionAboutMe: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    lastName: PropTypes.string,
    linkTo: PropTypes.string,
    photo: PropTypes.string,
    style: PropTypes.object,
};

export default SeProfile;
