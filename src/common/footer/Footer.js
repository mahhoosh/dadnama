import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    FooterItem
} from 'dadComponents';
import {
    SocialNetworks
} from 'components';
import ScrollableAnchor, { goToAnchor } from 'react-scrollable-anchor'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {


        return (
            <ScrollableAnchor id={'about'}>
                <footer
                    className={'footer'}
                >
                    <section
                        className={'seContent container'}
                    >
                        <div
                            className={'row'}
                        >
                            <div className={'col-lg-4'} >
                                <ul className={'footerItem'} >
                                    <li>
                                        <h4 className={'title'} >
                                            {'لینک ها'}
                                        </h4>
                                    </li>
                                    <li>
                                        <a href="javascript:{}" onClick={() => { goToAnchor('theme') }} >
                                            {" انتخاب قالب"}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:{}" onClick={() => { goToAnchor('about') }}  >
                                            {' درباره ما'}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:{}" onClick={() => { goToAnchor('contact') }} >
                                            {'تماس با ما'}
                                        </a>
                                    </li>

                                </ul>
                            </div>

                            <div className={'col-lg-4'} >
                                <ul className={'footerItem'} >
                                    <li>
                                        <h4 className={'title'} >
                                            {'مشتریان ما'}
                                        </h4>
                                    </li>
                                    <li>
                                        <a href="http://sajadweb.dadnama.ir" >
                                            {"محمد رحیمی"}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://sajadweb.dadnama.ir" >
                                            {"علی ایزدی"}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://sajadweb.dadnama.ir" >
                                            {"سعید کاظمی"}
                                        </a>
                                    </li>

                                </ul>
                            </div>
                            <div className={'col-lg-4'} >
                                <ul className={'footerItem'} >

                                    <li>
                                        <h4 className={'title'} >
                                            {'ایمیل'}
                                        </h4>
                                    </li>
                                    <li>{'info at dadname.ir'} </li>
                                    <li>{'support at dadname.ir'} </li>

                                    <li>
                                        <h4 className={'title'} >
                                            {'شماره تماس'}
                                        </h4>
                                    </li>
                                    <li>{'021 234 5678'} </li>
                                    <li>{'021 234 3245'} </li>
                                </ul>
                            </div>
                            {/* <div className={'col-lg-2'}   >
                                <div className="grid__cell">
                                    <div className={'lp-logo--small'}  >
                                        <svg viewBox="0 0 34 25" width="100%" height="100%">
                                            <g stroke="none" stroke-width="1" fill="#2990ea" fill-rule="evenodd">
                                                <g>
                                                    <path
                                                        d="M27.9413946,0 C25.3198908,0 23.1246477,1.69141914 22.4426305,4.22854785 C21.2491003,0.412541254 18.1373965,0 16.8586141,0 C15.5585187,0 12.468128,0.412541254 11.2532848,4.22854785 C10.5712675,1.69141914 8.39733751,0 5.75452063,0 C2.53625168,0 0,2.22772277 0,5.07425743 C0,6.33250825 0.319695591,7.34323432 0.703330299,8.43646865 L5.07250337,20.4207921 C6.54310309,24.4018152 9.5269286,24.9793729 11.1680326,24.9793729 C13.7469104,24.9793729 15.7716491,23.700495 16.8159881,21.4315182 C17.860327,23.7211221 19.8850657,25 22.4639435,25 C24.1050475,25 27.088873,24.4018152 28.5594728,20.4207921 L32.9712719,8.39521452 L33.013898,8.29207921 C33.0565241,8.14768977 33.1204632,8.00330033 33.1630893,7.85891089 C33.3975327,7.17821782 33.6532892,6.43564356 33.6532892,5.48679868 C33.6959152,2.31023102 31.2875418,0 27.9413946,0 L27.9413946,0 Z M29.6727386,7.54674756 L25.3630404,19.1441217 C24.8425454,20.5564949 23.9681139,21.5909091 22.3233498,21.5909091 C20.7826848,21.5909091 19.8666136,20.7753133 19.4293979,19.3629401 L16.8477429,11.6446191 L16.7852835,11.6446191 L14.2036285,19.3629401 C13.7455929,20.7753133 12.8295218,21.5710165 11.3096765,21.5710165 C9.66491246,21.5710165 8.79048093,20.5366023 8.26998597,19.1242292 L4.00192732,7.6064253 C3.64799075,6.63168888 3.48143236,6.03491148 3.48143236,5.33867118 C3.48143236,4.26447185 4.52242228,3.40909091 6.00062796,3.40909091 C7.22899606,3.40909091 8.10342759,4.18490153 8.37408496,5.3187786 L11.2680369,14.5091506 L11.3304963,14.5091506 L14.2660879,5.5177044 C14.6616641,4.22468669 15.3487174,3.40909091 16.8269231,3.40909091 C18.3051288,3.40909091 18.9921821,4.20479411 19.3877583,5.5177044 L22.3233498,14.5091506 L22.3858092,14.5091506 L25.2797612,5.3187786 C25.5504186,4.18490153 26.4248501,3.40909091 27.6532182,3.40909091 C29.1106041,3.40909091 30.1724138,4.28436443 30.1724138,5.75641536 C30.151594,6.27362244 29.9017564,6.8107221 29.6727386,7.54674756 L29.6727386,7.54674756 Z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                        <div className="socialNetworksWrapper">
                            <div className="copyright">
                                <Link
                                    to={'/'}
                                >
                                    کلیه حقوق این وبسایت متعلق به دادنما میباشد
                            </Link>
                            </div>
                            <div>
                                <SocialNetworks />
                            </div>
                            <div className="copyright">
                                <a
                                    href={'http://sajadweb.ir'}
                                >
                                    طراحش شده توسط ماههوش
                            </a>
                            </div>
                        </div>
                    </section>
                </footer>
            </ScrollableAnchor>
        );
    }
}

Footer.propTypes = {};

export default Footer;
