import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DashCard extends Component {
    render() {
        const {
            src,
            title,
            alertText,
            icon,
            alertTitle
        } = this.props;

        return (
            <div className="dashCard">
                <header className="cardHeader">
                    <h2 className="title">
                        <img className="dashCardImg"
                             src={icon}
                        />
                        {title}
                    </h2>
                </header>

                <article className="cardContent">
                    <div>
                        <h3
                            className="alertTitle">{alertTitle}
                        </h3>
                        <p className="alertText">{alertText}</p>
                    </div>
                </article>

            </div>
        )
    }
}

DashCard.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.object,
    alertText: PropTypes.string,
    alertTitle: PropTypes.string,
    src: PropTypes.string,
    inverse: PropTypes.bool,
    style: PropTypes.object
};

export default DashCard;
