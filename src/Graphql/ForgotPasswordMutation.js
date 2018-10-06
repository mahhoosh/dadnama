import gql from 'graphql-tag';

export const ForgotPassword = gql`
    mutation ForgotPasswordMutation($mobile: String, $email: String) {
        ForgotPasswordMutation(
            mobile: $mobile,
            email: $email
        ) {
            error
            description
        }
    }
`