import gql from 'graphql-tag';

export const CITY = gql`
    query city {
        city {
            id
            title

        }
    }
`
