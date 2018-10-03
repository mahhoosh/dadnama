import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Mutation} from "react-apollo";
import {DeleteModelMutation} from 'Graphql/DeleteModelMutation';
import Switch from "react-switch";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Utils from 'utils/Utils';

import {
    Modal,
    Spinners
} from 'components';

class SelectedEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            isModalOpen: false,
            isHover: false,
            checked: false,
            spinner: false
        };
        this.onSelected = this.onSelected.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    handleChange(checked) {
        this.setState({checked});
    }

    onMouseEnter() {
        // this.setState({
        //     isHover: true
        // })
        this.props.onMouseEnter && this.props.onMouseEnter();
    }

    onMouseLeave() {
        // this.setState({
        //     isHover: false
        // })
        this.props.onMouseLeave && this.props.onMouseLeave();
    }

    onSelected() {
        this.setState({
            selected: true
        })
    }

    onCloseModal() {
        this.setState({
            isModalOpen: false
        });
        this.props.onCloseModal && this.props.onCloseModal();
    }

    onOpenModal() {
        this.setState({
            isModalOpen: true
        });
        this.props.onOpenModal && this.props.onOpenModal();
    }

    onClickDelete(e, data, DeleteModelMutation, id, seClass) {
        //alert(seClass)
        //alert(id)
        e.preventDefault();

        this.setState({
            spinner: true
        });

        DeleteModelMutation({
            variables: {
                id: id,
                name: seClass,
            }

        }).then((data) => {
            toast.success("حذف با موفقیت انجام شد");
            this.setState({
                spinner: false
            });
            console.log('data', data)
        }).catch((err) => {
            this.setState({
                spinner: false
            });
            toast.error(Utils.gqlHandelError(err));
            console.log('err', err)
        });

        this.props.onClickDelete && this.props.onClickDelete();
    }

    render() {

        const {
            modalChildren, editIcon,
            children, deleteIcon, plusIcon,
            isHover,
            closeModal,
            id,
            seClass
        } = this.props;

        return (
            <Mutation mutation={DeleteModelMutation}>
                {(DeleteModelMutation, {data}) => (
                    <form>
                        <div
                            className={`am-selected-trimatrixlab ${this.state.selected ? 'active' : ''} ${isHover ? 'hover' : ''}`}
                            onClick={this.onSelected}
                            onMouseLeave={this.onMouseLeave}
                            onMouseEnter={this.onMouseEnter}
                        >
                            {
                                editIcon && <i className="icon fa fa-edit"
                                               onClick={this.onOpenModal}
                                />
                            }
                            {
                                <i className="icon delete fa fa-trash"
                                   onClick={(e) => this.onClickDelete(e, data, DeleteModelMutation, id, seClass)}
                                />
                            }
                            {/* {deleteIcon && <label htmlFor="normal-switch" className={'switch'}>
                    <span>Switch with default style</span>
                    <Switch
                        onChange={this.handleChange}
                        checked={this.state.checked}
                        id="normal-switch"
                    />
                </label>}
                {plusIcon && <i className="icon fa fa-plus-square"
                                onClick={this.onOpenModal}
                />}*/}
                            {children}
                            <Modal
                                open={this.state.isModalOpen && closeModal}
                                onClose={this.onCloseModal}
                                maxWidth={'500px'}
                            >
                                {modalChildren}
                            </Modal>
                            {

                                this.state.spinner && <Spinners
                                    loading={this.state.spinner}
                                />
                            }

                        </div>
                    </form>
                )}
            </Mutation>
        )
    }
}

SelectedEdit.propTypes = {
    modalChildren: PropTypes.node,
    children: PropTypes.node,
    editIcon: PropTypes.bool,
    deleteIcon: PropTypes.bool,
    closeModal: PropTypes.bool,
    id: PropTypes.number,
    seClass: PropTypes.string,
    plusIcon: PropTypes.bool,
    isHover: PropTypes.bool,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onCloseModal: PropTypes.func,
    onOpenModal: PropTypes.func,
};

export default SelectedEdit;
