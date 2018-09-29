import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Query} from "react-apollo";
import {NETWORKS} from 'Graphql/NetworksQuery';
import {
    SelectedEdit,
    SeNetworks
} from 'templates/trimatrixlab';

class SeAboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }


    render() {
        const {
            direction, src, descriptionMe,
            name, lastName, skypeId, email,
            descriptionMission
        } = this.props;

        return (
            <Query query={NETWORKS}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (<div>
                                {/*loading*/}
                            </div>)
                        } else if (data) {
                            console.log('========seAboutMe', data)
                            return <div className={` seAboutMe-trimatrixlab ${direction}`}>
                                <div
                                    className={'about'}
                                >
                                    {/* <h3 className="mb-20">درباره من</h3>
                                        <p className="lead mb-35">
                                            {descriptionMe}
                                        </p>*/}
                                    <ul className="about-list">

                                        <li>
                                            <div className="right">نام:</div>
                                            <div className="left">{`${name} ${lastName}`}</div>
                                        </li>
                                        {
                                            data.networks.map((net, index) => {
                                                return <li
                                                    key={index}
                                                >
                                                    <div className="right">{net.network_type.title}</div>
                                                    <div className="left">{net.name}</div>
                                                </li>

                                            })
                                        }

                                    </ul>
                                </div>

                              {/*  <div className="col-md-5">

                                    <div className="row">

                                        <div className="col-xs-12">

                                            <h3 className="mb-20"> هدف(ماموریت)</h3>
                                            <p className="lead mb-35">
                                                {descriptionMission}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-xs-12 center-sm center-xs">
                                            <Link
                                                className="btn btn-default easing"
                                                to={'/'}
                                            >
                                                Hire me
                                            </Link>
                                            <Link
                                                className="btn btn-default"
                                                to={'/'}
                                            >
                                                Download CV
                                            </Link>
                                        </div>

                                    </div>

                                </div>*/}
                              {/*  <SeNetworks/>*/}
                            </div>
                        }
                        else {
                            console.log('error', error);
                        }
                    }}
            </Query>
        )
    }
}

SeAboutMe.propTypes = {
    direction: PropTypes.string,
    descriptionMission: PropTypes.string,
    descriptionMe: PropTypes.string,
    email: PropTypes.string,
    skypeId: PropTypes.string,
    name: PropTypes.string,
    lastName: PropTypes.string,
    src: PropTypes.string,
    linkTo: PropTypes.string,
    style: PropTypes.object,
};

export default SeAboutMe;
