import gql from 'graphql-tag';

export const NETWORK_TYPES = gql`
    query network_types{
        network_types{
            id
            title
            name
            icon
            font_icon
        }
    }
`
