import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

let isLogin = Boolean(localStorage.getItem('token'));//اینجا باید از لوکال استورج بخونید
let uri =  window.base_api;
if (isLogin) {
    //این ادرس وقتی لاگین هستش
    uri = `${uri}/user`;
}

// get the authentication token from local storage if it exists
const token = localStorage.getItem('token');//اینجا باید از لوکال استورج بخونید

const httpLink = createHttpLink({
    uri: uri,
});

const authLink = setContext((_, {headers}) => {
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Apigkey: token ? `${token}` : null,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


export default client;