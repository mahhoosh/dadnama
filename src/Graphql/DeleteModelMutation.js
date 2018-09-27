import gql from 'graphql-tag';

export const DeleteModelMutation = gql`
    mutation DeleteModelMutation ($id:Int, $name: String) {
        delete_model(
            id: $id,
            name: $name
        ) {
            error
            description
        }
    }
`