import gql from 'graphql-tag';

export const USER_ABOUT = gql`
    query user_about {
        user_about {
            title
            first_name
            last_name
            text
            description
        }
    }
`
