import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Mutation} from "react-apollo";
import Switch from "react-switch";
import {CHANGE_USER_SEGMENT} from 'Graphql/ChangeUserSegment';

import {
    Modal
} from 'components';

class SeSelected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            isModalOpen: false,
            isHover: false,
            checked: this.props.checked
        };
        this.onSelected = this.onSelected.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked, data, change_user_segment) {
        this.setState({checked});
        console.log('========Selected Class checked====', data, checked, this.props.seClass)
        //e.preventDefault();
        change_user_segment({
            variables: {
                segment: this.props.seClass
            }

        }).then((data) => {
            console.log('data', data)
        }).catch((res) => {
            console.log('res', res)
        });
    }

    onMouseEnter() {
        this.setState({
            isHover: true
        })
        this.props.onMouseEnter && this.props.onMouseEnter();
    }

    onMouseLeave() {
        this.setState({
            isHover: false
        })
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
        })
        this.props.onOpenModal && this.props.onOpenModal();
    }

    render() {
        const {
            modalChildren, editIcon, children,
            closeModal,
            switchIcon, plusIcon, isHover,
            seClass
        } = this.props;

        return (
            <Mutation mutation={CHANGE_USER_SEGMENT}>
                {(change_user_segment, {data}) => (
                    <form>
                        <div
                            className={`am-seSelected-trimatrixlab ${seClass} ${this.state.selected ? 'active' : ''} ${this.state.isHover ? 'hover' : ''}`}
                            onClick={this.onSelected}
                            onMouseLeave={this.onMouseLeave}
                            onMouseEnter={this.onMouseEnter}
                        >
                            {
                                editIcon && <i className="icon fa fa-edit"
                                               onClick={this.onOpenModal}
                                />
                            }
                            {switchIcon && <label htmlFor="normal-switch" className={'switch'}>
                                <Switch
                                    onChange={(e) => this.handleChange(e, data, change_user_segment)}
                                    //onChange={this.handleChange}
                                    checked={this.state.checked}
                                    id="normal-switch"
                                />
                            </label>}
                            {plusIcon && <i className="icon fa fa-plus-square"
                                            onClick={this.onOpenModal}
                            />}
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

SeSelected.propTypes = {
    modalChildren: PropTypes.node,
    children: PropTypes.node,
    editIcon: PropTypes.bool,
    switchIcon: PropTypes.bool,
    plusIcon: PropTypes.bool,
    isHover: PropTypes.bool,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func,
    closeModal: PropTypes.bool,
    checked: PropTypes.bool,
    seClass: PropTypes.string

};

export default SeSelected;
