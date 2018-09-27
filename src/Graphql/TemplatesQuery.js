import gql from 'graphql-tag';

export const TEMPLATES_LIST = gql`
    query {
        templates{
            id
            title
            path
            description
            sort
        }
    }
`
