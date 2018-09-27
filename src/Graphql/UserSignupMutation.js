import gql from 'graphql-tag';

export const USER_SIGNUP = gql`
    mutation UserSignupMutation(
    $username: String,
    $name: String
    $mobile: String,
    $email: String,
    $password: String
    ) {
        UserSignupMutation(
            username: $username,
            name: $name,
            mobile: $mobile,
            email: $email,
            password: $password
        )  {
            api
            success
            errors
            user {
                id
                name
                username
                email
                mobile
            }
        }
    }
`