import gql from 'graphql-tag';

export const CHANGE_USER_SEGMENT = gql`
    mutation change_user_segment ($segment: String) {
        change_user_segment(
            segment: $segment
        ){
            id
            segment
            act
        }
    }
`