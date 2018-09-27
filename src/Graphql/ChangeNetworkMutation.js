import gql from 'graphql-tag';

export const CHANGE_SOCIAL = gql`
    mutation CHANGE_SOCIAL($id:Int,$name: String) {
        network(
            network_type_id: $id,
            name: $name
        )
        {
            id
            name
            network_type{
                id
                name
                title
                icon
            }
        }
    }
`