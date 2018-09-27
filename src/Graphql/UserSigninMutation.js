import gql from 'graphql-tag';

export const USER_SIGNIN = gql`
    mutation UserSigninMutation($username: String, $password: String) {
        UserSigninMutation(
            username: $username,
            password: $password
        ) {
            api
            success
            errors
            user {
                name
                username
                email
                mobile
            }
        }
    }
`