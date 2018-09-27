import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {
    SelectedEdit
} from 'templates/trimatrixlab';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onOpenModal = this.onOpenModal.bind(this);
    }

    onOpenModal(data) {
        this.props.onOpenModal && this.props.onOpenModal(data)
    }

    render() {
        const {
            direction,
            description,
            title,
            percent,
            modalChildren,
            isHover,
            onMouseLeave,
            onMouseEnter,
            closeModal,
            progressBar,
            badge,
            count,
            icon,
            className
        } = this.props;

        return (

            <div className={`skill ${direction} ${className}`}>
                <SelectedEdit
                    editIcon
                    modalChildren={modalChildren}
                    isHover={isHover}
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    closeModal={closeModal}
                    onOpenModal={() => this.onOpenModal(percent)}
                >
                    {
                        badge && <div>
                            <span className="countWrapper badge-secondary">
                              {count}
                            </span>
                        </div>
                    }
                    <div
                        className={'skill-title'}
                    >
                        {icon && <i className="iconFont fa fa-camera"/>}
                        <h4>{title}</h4>
                    </div>
                    {
                        progressBar && <div>
                            <Progress
                                className={'skillbar'}
                                percent={percent}
                            />
                        </div>
                    }
                    <div
                        className={'skill-content'}
                    >
                        <p className="lead mb-35">
                            {description}
                        </p>
                    </div>
                </SelectedEdit>
            </div>
        )
    }
}

Skill.propTypes = {
    direction: PropTypes.string,
    descriptionMission: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    percent: PropTypes.number,
    count: PropTypes.number,
    name: PropTypes.string,
    src: PropTypes.string,
    linkTo: PropTypes.string,
    style: PropTypes.object,
    modalChildren: PropTypes.node,
    isHover: PropTypes.bool,
    progressBar: PropTypes.bool,
    badge: PropTypes.bool,
    onMouseLeave: PropTypes.func,
    onOpenModal: PropTypes.func,
    onMouseEnter: PropTypes.func,
    closeModal: PropTypes.bool,
};

export default Skill;
