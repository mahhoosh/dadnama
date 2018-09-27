import gql from 'graphql-tag';

export const templates = gql`
    query templates{
        templates{
            id
            title
            name
            link
            path
            description
            sort
        }
    }
`
