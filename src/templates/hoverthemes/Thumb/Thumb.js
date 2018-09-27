import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Modal
} from 'components';

import {
    SelectedEdit
} from 'templates/hoverthemes';

class Thumb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OpenModal: false
        };
        this.onClickToggleModal = this.onClickToggleModal.bind(this)
    }

    onClickToggleModal() {
        this.setState({
            OpenModal: true
        })
    }

    render() {
        const {
            src,
            alt,
        } = this.props;

        return (
            <div className='am-thumb'>
                <SelectedEdit
                    editIcon
                   /* modalChildren={modalChildren}
                    isHover={isHover}
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    closeModal={closeModal}
                    onOpenModal={this.onOpenModal}*/
                >
                    <div className="thumb">
                        <div className="overlayThumb"/>
                        <img src={src} alt=""/>
                        <div className="meta">
                            <div className="inner">

                                <div className="btns">
                                <span
                                    onClick={this.onClickToggleModal}
                                >
                                    <i className="fa fa-search"/></span>
                                </div>

                                <h4>Portfolio Title</h4>
                            </div>
                        </div>
                    </div>
                </SelectedEdit>
                <Modal
                    open={this.state.OpenModal}
                    onClose={() => {
                        this.setState({
                            OpenModal: false
                        })
                    }}
                >
                    <img src={src} alt=""/>
                </Modal>
            </div>
        )
    }
}

Thumb.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default Thumb;
