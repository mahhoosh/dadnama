import gql from 'graphql-tag';

export const NETWORKS = gql`
    query networks{
        networks {
            name
            network_type{
                id
                title
                name
                icon
                font_icon
            }
        }
    }
`
