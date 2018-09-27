import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class Menu extends Component {
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
        const {} = this.props;

        return (
            <ul
                className={'am-menu'}
            >
                <li>
                    <Link
                        to={'/'}
                    >
                        menu1
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/'}
                    >
                        menu1
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/'}
                    >
                        menu1
                    </Link>
                </li>
                <li
                    className={'subMenuWrapper'}
                >
                    <span
                        className={'title'}
                        onClick={this.onClickOpenSubMenu}
                    >
                        menu1
                         <i className="icon fa fa-caret-down"/>
                    </span>
                    <div
                        className={`dropDown ${this.state.openSubMenu ? 'open' : ''}`}
                    >
                        <i className="subMenuIcon fa fa-caret-up"/>
                        <ul

                        >
                            <li>
                                <Link
                                    to={'/'}
                                >
                                    submenu1
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={'/'}
                                >
                                    submenu1
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        );
    }
}

Menu.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string
};
export default Menu;