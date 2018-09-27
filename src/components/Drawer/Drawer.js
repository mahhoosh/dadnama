import React from 'react';
import PropTypes from 'prop-types';

class Drawer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showNav: props.showNav || false
        };
        this.hideNav = this.hideNav.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showNav !== this.props.showNav && nextProps.showNav !== this.state.showNav)
            nextProps.showNav ? this.showNav() : this.hideNav();
    }

    shouldComponentUpdate(nextProps, nextStates) {
        if (nextProps.showNav !== this.props.showNav && nextProps.showNav === this.state.showNav)
            return false;
        return true;
    }

    showNav() {
        this.refs.nav.style.transition = 'transform 0.33s cubic-bezier(0,0,0.3,1)';
        this.setState({showNav: true}, this.props.onShowNav);
    }

    hideNav() {
        this.refs.nav.style.transition = 'transform 0.13s cubic-bezier(0,0,0.3,1)';
        this.setState({showNav: false}, this.props.onHideNav);
    }

    onTouchStart(evt) {
        this.startX = evt.touches[0].pageX;
        this.currentX = this.startX;
        this.touchingSideNav = true;
        requestAnimationFrame(this.update);
    }

    onTouchMove(evt) {
        let {openFromRight} = this.props;
        if (!this.touchingSideNav) return;
        this.currentX = evt.touches[0].pageX;
        const translateX = Math[openFromRight ? 'max' : 'min'](0, this.currentX - this.startX);
        if (!openFromRight && translateX < 0) evt.preventDefault();
        if (openFromRight && translateX > 0) evt.preventDefault();
    }

    onTouchEnd(evt) {
        let {openFromRight} = this.props;
        if (!this.touchingSideNav) return;
        this.touchingSideNav = false;
        const translateX = Math[openFromRight ? 'max' : 'min'](0, this.currentX - this.startX);
        this.refs.nav.style.transform = '';
        if (!openFromRight && translateX < 0) this.hideNav();
        if (openFromRight && translateX > 0) this.hideNav();
    }

    update() {
        let {openFromRight} = this.props;
        if (!this.touchingSideNav) return;
        requestAnimationFrame(this.update);
        const translateX = Math[openFromRight ? 'max' : 'min'](0, this.currentX - this.startX);
        this.refs.nav.style.transform = `translateX(${translateX}px)`;
    }


    getStyle() {
        let {showNav} = this.state;
        let {openFromRight} = this.props;
        let styles = {
            root: {
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                overflow: 'hidden',
                zIndex: 8,
                pointerEvents: showNav ? 'auto' : 'none'
            },
            nav: {
                maxWidth: `${this.props.maxWidth}`,
                transform: showNav ? 'none' : `translateX(${openFromRight ? 102 : -102}%)`,
                willChange: 'transform',
                float: openFromRight ? 'right' : 'left'
            },
            overlay: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                opacity: showNav ? 1 : 0,
                transition: 'opacity 0.3s cubic-bezier(0, 0, 0.3, 1)',
                willChange: 'opacity'
            },
            title: {
                fontWeight: 400,
                margin: 0,
                padding: 22
            }
        };

        Object.assign(styles.root, this.props.style);
        Object.assign(styles.nav, this.props.navStyle);
        Object.assign(styles.title, this.props.titleStyle);
        return styles;
    }

    render() {
        const {primary, secondary, defaultBg} = this.props
        let styles = this.getStyle();
        let navClass = '';
        if (primary) {
            navClass = 'primary';
        } else if (secondary) {
            navClass = 'secondary';
        } else if (defaultBg) {
            navClass = 'default';
        }

        return (
            <aside
                style={styles.root}
                className={`drawer`}
            >
                <div
                    className='overlay'
                    style={styles.overlay}
                    onClick={this.hideNav.bind(this)}
                />
                <nav
                    className={`nav ${navClass}`}
                    style={styles.nav}
                    onTransitionEnd={(e) => {
                        e.target.style.transition = 'none'
                    }}
                    onTouchStart={this.onTouchStart.bind(this)}
                    onTouchMove={this.onTouchMove.bind(this)}
                    onTouchEnd={this.onTouchEnd.bind(this)}
                    ref="nav">
                    <div
                        className='header-drawer'
                        style={styles.title}>{this.props.title || 'Navigation'}
                    </div>
                    {this.props.children}
                </nav>
            </aside>
        );
    }
}

Drawer.propTypes = {
    style: PropTypes.object,
    navStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    itemStyle: PropTypes.object,
    itemHoverStyle: PropTypes.object,
    title: PropTypes.node,
    children: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.node),
    showNav: PropTypes.bool,
    openFromRight: PropTypes.bool,
    onHideNav: PropTypes.func,
    onShowNav: PropTypes.func,
    maxWidth: PropTypes.number,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    defaultBg: PropTypes.bool
};


export default Drawer;