import gql from 'graphql-tag';

export const USER_EDUCATIONALES = gql`
    query user_educationales{
        user_educationales {
            id
            title
            city{
                id
                title
            }
            started_at
            stopped_at
        }
    }
`
