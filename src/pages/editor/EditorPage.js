import React from 'react';
import PropTypes from 'prop-types';

import {
    ThemePoster,
    SelectDomain,
} from 'dadComponents';
import {
    Overlay,
    Outside
} from 'components';

import {
    HoverthemesPage,
} from 'templates/hoverthemes';

import {
    TrimatrixlabPage
} from 'templates/trimatrixlab';

class EditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onClose: true
        }
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({
            onClose: false
        })
    }

    render() {
        let outsideList = [
            {
                id: '1',
                title: 'داشبورد',
                icon: <i className="fa fa-dashboard"/>
            },
            {
                id: '2',
                title: 'فاکتورها',
                icon: <i className="fa fa-align-left"/>
            },
            {
                id: '3',
                title: 'پروفایل',
                icon: <i className="fa fa-user"/>
            }
            ,
            {
                id: '4',
                title: 'پیامها',
                icon: <i className="fa fa-comments"/>
            },
            {
                id: '5',
                title: 'تنظیمات',
                icon: <i className="fa fa-cog"/>
            }
        ];
        return (
            <section className={'editorPage'}>
                <Overlay
                    //open={this.state.onClose}
                    onClose={this.onClose}
                >
                    <SelectDomain/>
                </Overlay>
                <div
                    className={'w-editor-top'}
                >
                    <div
                        className={'w-logo-top'}
                    >
                        logo
                    </div>
                    <nav>
                        build
                    </nav>
                </div>

                <aside
                    className={'w-editor-left'}
                >
                    <Outside
                        outsideList={outsideList}
                    />
                </aside>

                <div
                    className={'view-container'}
                >
                    {/*<HoverthemesPage/>*/}
                    <TrimatrixlabPage/>
                </div>
                {/* <footer
                    className={'editorFooter'}
                >
                    footer
                </footer>*/}
            </section>
        );
    }
}

EditorPage.propTypes = {};

export default EditorPage;
