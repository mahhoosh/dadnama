import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    SelectedEdit
} from 'templates/trimatrixlab';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onOpenModal = this.onOpenModal.bind(this);
    }

    onOpenModal() {
        this.props.onOpenModal && this.props.onOpenModal()
    }

    render() {
        const {
            direction,
            title,
            modalChildren,
            isHover,
            onMouseLeave,
            onMouseEnter,
            reference,
            startedAt,
            stoppedAt,
            closeModal,
            id,
            seClass
        } = this.props;

        return (

            <div className={`timeline-wrapper ${direction}`}>
                <SelectedEdit
                    editIcon
                    modalChildren={modalChildren}
                    isHover={isHover}
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    closeModal={closeModal}
                    onOpenModal={this.onOpenModal}
                    id={id}
                    seClass={seClass}
                >
                    <div className="timeline-content">
                        <span
                            className={'timeline-dot'}
                        >
                            <i className="fa fa-graduation-cap"/>
                        </span>
                        <div
                            className={'timelineBox'}
                        >
                            {title && <h3>{title}</h3>}
                            <label
                                className={'dateWrapper'}
                            >
                                {reference && <span
                                    className={'reference'}
                                >{reference}</span>}
                                <span
                                    className={'date'}
                                >{`از ${startedAt} تا ${stoppedAt}`}</span></label>
                            <p>
                                {direction}
                            </p>
                        </div>
                    </div>
                </SelectedEdit>
            </div>
        )
    }
}

Timeline.propTypes = {
    direction: PropTypes.string,
    reference: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    seClass: PropTypes.string,
    style: PropTypes.object,
    modalChildren: PropTypes.node,
    isHover: PropTypes.bool,
    onMouseLeave: PropTypes.func,
    onOpenModal: PropTypes.func,
    onMouseEnter: PropTypes.func,
    startedAt: PropTypes.number,
    stoppedAt: PropTypes.number,
    closeModal: PropTypes.bool,
};

export default Timeline;
