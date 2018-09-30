import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Query} from "react-apollo";
import {Mutation} from "react-apollo";
import {NETWORKS} from 'Graphql/NetworksQuery';
import {NETWORK_TYPES} from 'Graphql/NetworkTypesQuery';
import {CHANGE_SOCIAL} from 'Graphql/ChangeNetworkMutation';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Utils from 'utils/Utils';

import {
    Skills,
    SeSelected,
    SelectedEdit,
    SeProfile,
    SeAboutMe,
} from 'templates/hoverthemes';
import {
    Edit
} from 'dadComponents';
import {
    Input,
    Spinners
} from 'components';

class SeNetworks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closeModal: true,
            closeModalEdit: true,
            name: '',
            index: 0,
            networkTypeId: 1,
            spinner: false
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onOpenModalEdit = this.onOpenModalEdit.bind(this);
    }

    onChangeValue(selected) {
        this.setState({
            networkTypeId: selected.id
        });
    }

    onChangeTitle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onOpenModal() {
        this.setState({
            closeModal: true,
            name: ''
        });
    }

    onOpenModalEdit(data) {
        this.setState({
            closeModalEdit: true,
            name: data.name
        });
    }

    onClickEdit(e, errorM, data, change_social, id) {
        e.preventDefault();

        this.setState({
            spinner: true
        });

        change_social({
            variables: {
                id: this.state.networkTypeId,
                name: this.state.name
            }
        }).then((data) => {
            toast.success("تغییرات شما با موفقیت اعمال شد");
            this.setState({
                closeModal: false,
                closeModalEdit: false,
                spinner: false
            });
            console.log('data alesaadi', data)
        }).catch((err) => {
            this.setState({
                spinner: false
            })
            toast.error(Utils.gqlHandelError(err));
            console.log('err', err)
        });
        console.log('id', id)
    }

    render() {
        const {} = this.props;
        let inputData = [
            {
                id: 1,
                name: 'name',
                label: 'نام',
                value: this.state.name
            }
        ]

        return (
            <Query query={NETWORKS}>
                {
                    ({loading: loadingOne, data: {networks}}) => (

                        <Query query={NETWORK_TYPES}>
                            {({loading: loadingTwo, data: {network_types}}) => {
                                if (loadingOne || loadingTwo) {
                                    return (<div>
                                        {/* <Spinner/>*/}
                                    </div>)
                                } else if (networks) {
                                    console.log('NETWORKS--', networks)
                                    return <Mutation mutation={CHANGE_SOCIAL}>
                                        {(change_social, {loadingM, errorM, dataM}) => (
                                            <form>
                                                {console.log('dataM ---net one', networks)}
                                                <SeSelected
                                                    plusIcon
                                                    switchIcon
                                                    seClass={'networks'}
                                                    modalChildren={
                                                        <Edit
                                                            dropDownList
                                                            title={'افزودن'}
                                                            labelBtn={'افزودن'}
                                                            inputData={inputData}
                                                            list={network_types}
                                                            onChangeValue={this.onChangeValue}
                                                            onChange={this.onChangeTitle}
                                                            onClickEdit={(e) => this.onClickEdit(e, errorM, dataM, change_social)}
                                                        />
                                                    }
                                                    closeModal={this.state.closeModal}
                                                    onOpenModal={this.onOpenModal}
                                                >
                                                    <ul className="follow-me">
                                                        {
                                                            networks.map((net, index) => {
                                                                return <li
                                                                    key={index}
                                                                >
                                                                    <SelectedEdit
                                                                        editIcon
                                                                        closeModal={this.state.closeModalEdit}
                                                                        onOpenModal={() => this.onOpenModalEdit(net)}
                                                                        modalChildren={
                                                                            <Edit
                                                                                dropDownList
                                                                                onChangeValue={this.onChangeValue}
                                                                                title={'ویرایش'}
                                                                                labelBtn={'ویرایش'}
                                                                                inputData={inputData}
                                                                                list={network_types}
                                                                                onChange={this.onChangeTitle}
                                                                                onClickEdit={(e) => this.onClickEdit(e, errorM, dataM, change_social, net.network_type.id)}
                                                                            />
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={'/'}
                                                                        >
                                                                            {
                                                                                net.network_type.font_icon ?
                                                                                    <i className={`iconNet fa ${net.network_type.font_icon}`}/>
                                                                                    :
                                                                                    <img
                                                                                        className={'iconNet'}
                                                                                        src={net.network_type.icon}
                                                                                    />
                                                                            }
                                                                        </Link>
                                                                    </SelectedEdit>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </SeSelected>

                                                <Spinners
                                                    loading={this.state.spinner}
                                                />

                                            </form>
                                        )}
                                    </Mutation>
                                }
                                else {
                                    //console.log('error', error);
                                }
                            }}
                        </Query>
                    )
                }
            </Query>
        )
    }
}

SeNetworks.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default SeNetworks;
