import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Link} from 'react-router-dom';
import {USER_PHOTO} from 'Graphql/UserPhotoQuery';

import {
    Selected,
    SeSelected
} from 'templates/trimatrixlab';
import {
    Edit
} from 'dadComponents';

class SeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closeModal: true,
            dataFile: {}
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.showCroppedImage = this.showCroppedImage.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.dataFile = '';
    }

    onOpenModal() {
        this.setState({
            closeModal: true
        });
    }

    showCroppedImage(croppedAreaPixels) {
       /* let dataFile = new FormData();
        dataFile.append('file', croppedAreaPixels);*/
       /* this.dataFile = dataFile;*/
        console.log('croppedArea=====999 profile',croppedAreaPixels)
          this.setState({
              dataFile: this.croppedAreaPixels
          });
    }

    onClickEdit() {

        //e.preventDefault();
        axios.post(`http://api.dadnama.sajadweb.ir/api/upload/image/${this.props.photo}`, this.state.dataFile
            , {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
            console.log(res.data);
        })
            .catch((error) => {
                console.log('error', error);
            });

    }

    render() {
        const {
            direction, photo, description, name, linkTo, lastName
        } = this.props;

        return (
            <Query query={USER_PHOTO}
                   variables={{
                       photo: photo
                   }}
            >
                {({data, fetchMore}) => (

                    <div className={`row SeProfile-wrapper bg-paper ${direction}`}>
                        {console.log('data===== profile 888888', data)}
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div
                                className={'intro-title-wrapper'}
                            >
                                <h3 className="intro-title">{name}{lastName}</h3>
                                <h4 className="intro-subtitle">{description}</h4>
                                <Link
                                    className="link animated easing"
                                    to={linkTo}
                                >
                                    درباره من
                                </Link>
                            </div>
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

                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <SeSelected
                                editIcon
                                modalChildren={
                                    <Edit
                                        srcImgCrp={data.user_photo ? window.base_image + data.user_photo.path : ''}
                                        title={'ویرایش'}
                                        labelBtn={'ویرایش'}
                                        cropper
                                        fileUpload
                                        showCroppedImage={this.showCroppedImage}
                                        onClickEdit={this.onClickEdit}
                                    />
                                }
                                closeModal={this.state.closeModal}
                                onOpenModal={this.onOpenModal}
                            >
                                {console.log('SeProfile===== 2', data.user_photo)}
                                <img className={'imgProfile'}
                                     src={data.user_photo ? window.base_image + data.user_photo.path : ''} alt={''}/>
                            </SeSelected>
                        </div>


                    </div>
                )}

            </Query>
        )
    }
}

SeProfile.propTypes = {
    direction: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    lastName: PropTypes.string,
    linkTo: PropTypes.string,
    photo: PropTypes.string,
    style: PropTypes.object,
};

export default SeProfile;
