import React, {Component} from 'react';
import {
    Router, Route, Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    HomePage,
    NotFountPage,
    LoginPage,
    FeedPage,
    OnboardingPage,
    HomeThemes,
    EditorPage
} from 'pages';
import {
    HoverthemesPage
} from 'templates/hoverthemes';

import {
    Header,
    Footer
} from 'common';

import * as routes from './routes/const';
import {createBrowserHistory} from 'history';
import TrimatrixlabPage from "./templates/trimatrixlab/TrimatrixlabPage";

const history = createBrowserHistory();

const Home = ({match}) => {
    return (
        <main
            className={'theme-secondary'}
        >
            {!Boolean(localStorage.getItem('token')) && <Header/>}
            <div
                id='pages'
                className={'pages'}
            >
                <Switch>
                    <Route path={routes.HOME} component={FeedPage}/>
                    <Route exact path={routes.APP_ROOT} component={Boolean(localStorage.getItem('token')) ?
                        EditorPage
                        :
                        HomePage}/>
                    <Route render={() => <NotFountPage/>}/>
                </Switch>
            </div>
            {!Boolean(localStorage.getItem('token')) && <Footer/>}
        </main>
    );
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        let isLogin = Boolean(localStorage.getItem('token'));
    }

    render() {
        console.log('Boolean(localStorage.getItem(\'token\'))', Boolean(localStorage.getItem('token')))
        return (
            <Router history={history}>
                <main className={'theme-secondary'}>
                    <Switch>
                        <Route path={routes.LOGIN} component={LoginPage}/>
                        <Route path={routes.ON_BOARDING} component={OnboardingPage}/>
                        <Route path={routes.HOME_tHEME} component={HomeThemes}/>
                        <Route path={routes.HOVER_THEMES} component={HoverthemesPage}/>
                        <Route path={routes.TRIMATRIXLAB} component={TrimatrixlabPage}/>
                        <Route path={routes.EDITOR} component={EditorPage}/>}
                        <Route path='/*' component={Home}/>
                    </Switch>
                </main>
            </Router>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;


