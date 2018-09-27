import gql from 'graphql-tag';

export const SKILLS = gql`
    query skills($page: Int, $count: Int,$search: String){
        skills(
            page:$page,
            count:$count,
            search:$search)
        {
            id
            title
            status
        }
    }
`
