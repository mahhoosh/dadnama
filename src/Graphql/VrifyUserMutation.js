import gql from 'graphql-tag';

export const VrifyUserMutation = gql`
    mutation VrifyUserMutation(
    $mobile: String,
    $code: String
    ) {
        VrifyUserMutation(
            mobile: $mobile,
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