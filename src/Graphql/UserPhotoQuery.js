import gql from 'graphql-tag';

export const USER_PHOTO = gql`
    query user_photo ($photo: String) {
        user_photo(photo : $photo){
            id
            path
            photo_type{
                title
                lable
                id
            }
        }
    }
`
