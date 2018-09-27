import gql from 'graphql-tag';

export const USER_COURT_CASES = gql`
    query user_court_cases{
        user_court_cases {
            id
            title
            reference
            started_at
            stopped_at
        }
    }
`
