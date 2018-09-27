import gql from 'graphql-tag';

export const USER_STATISTIC = gql`
    query user_statistic {
        user_statistic {
            id
            title
            count
        }
    }
`
