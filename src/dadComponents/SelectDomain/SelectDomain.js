import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
    Input,
    Button
} from 'components';
import resultIMg from 'assets/images/browser_@2x.png'

class SelectDomain extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        const {
            src,
            alt,
        } = this.props;

        return (
            <div className='am-SelectDomain'>
                <div>
                    <h1 className="topbarTitle">Select your domain name</h1>
                    <div className="domainsSearch">
                        <Button
                            className="search-button"
                            label={'Search'}
                            btnOutlinePrimary
                        />
                        <label
                            className={'domain'}
                        >
                            <Input
                                type="search" placeholder="weebly.com"
                                autoFocus=""/>
                            <span>
                            https://www.</span>
                        </label>
                        <div className="in-header">
                            Already own a domain? No problem,
                            <Link
                                to={'/'}
                            >
                                connect or transfer
                                it now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="domain-results">
                    <div className="no-results">
                        <img className="theme-poster_screenShot-img" src={resultIMg}
                             alt={alt}/>
                        <p>
                            Choose a domain name.
                            <br/>
                            This is where people will find your website.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

SelectDomain.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default SelectDomain;
