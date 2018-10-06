import gql from 'graphql-tag';

export const VrifyUserMutation = gql`
    mutation VrifyUserMutation(
    $mobile: String,
    $email: String,
    $password: String,
    $code: String
    ) {
        VrifyUserMutation(
            mobile: $mobile,
            email: $email,
            password: $password,
            code: $code
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