import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Mutation} from "react-apollo";
import {DeleteModelMutation} from 'Graphql/DeleteModelMutation';
import Switch from "react-switch";

import {
    Modal
} from 'components';

class SelectedEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            isModalOpen: false,
            isHover: false,
            checked: false
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


    onClickDelete(e, data, DeleteModelMutation, id) {
        e.preventDefault();

        /* this.setState({
             spinner: true
         });*/

        DeleteModelMutation({
            variables: {
                id: id,
                name: 'educationales',
            }

        }).then((data) => {
            /*toast.success("تغییرات شما با موفقیت اعمال شد");
            this.setState({
                closeModal: false,
                closeModalEdit: false,
                spinner: false
            });*/
            console.log('data', data)
        }).catch((err) => {
            /*this.setState({
                spinner: false
            });
            toast.error(Utils.gqlHandelError(err));*/
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
            id
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
                                   onClick={(e) => this.onClickDelete(e, data, DeleteModelMutation, id)}
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
    plusIcon: PropTypes.bool,
    isHover: PropTypes.bool,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onCloseModal: PropTypes.func,
    onOpenModal: PropTypes.func,
};

export default SelectedEdit;
