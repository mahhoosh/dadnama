import gql from 'graphql-tag';

export const USER_SKILLS = gql`
    query user_skills{
        user_skills {
            id
            percentage
            skill{
                id
                title
            }
        }
    }
`
