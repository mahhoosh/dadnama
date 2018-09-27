import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.css';
import Routes from './routes/index';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider} from 'react-apollo';
import Client from 'Graphql/Client'

ReactDOM.render(
    <ApolloProvider client={Client}>
        <Routes/>
    </ApolloProvider>
    ,
    document.getElementById('root'));
registerServiceWorker();
