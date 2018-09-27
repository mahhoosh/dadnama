import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class FooterItem extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                openSubMenu: false
            };
        this.onClickOpenSubMenu = this.onClickOpenSubMenu.bind(this)
    }

    onClickOpenSubMenu() {
        this.setState({
            openSubMenu: !this.state.openSubMenu
        });
    }

    render() {
        const {title, textArray} = this.props;

        return (
            <ul
                className={'footerItem'}
            >
                <li>
                    <h4
                        className={'title'}
                    >
                        {title}
                    </h4>
                </li>

                {
                    textArray && textArray.map((data, index) => {
                        return <li
                            key={index}
                        >
                            <Link
                                to={data.link}
                            >
                                {data.title}
                            </Link>
                        </li>

                    })
                }
            </ul>
        );
    }
}

FooterItem.propTypes = {
    title: PropTypes.string,
    textArray: PropTypes.string
};
export default FooterItem;