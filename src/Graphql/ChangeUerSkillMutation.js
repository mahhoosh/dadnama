import gql from 'graphql-tag';

export const CHANGE_USER_SKILL = gql`
    mutation change_user_skill($id:Int,$skill_id: Int, $percentage: Int)
    {
        change_user_skill(
            id: $id,
            skill_id: $skill_id,
            percentage: $percentage
        )  {
            id
            percentage
            skill{
                id
                title
            }
        }
    }
`