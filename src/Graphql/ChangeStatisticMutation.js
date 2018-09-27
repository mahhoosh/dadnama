import gql from 'graphql-tag';

export const CHANGE_STSTISTIC = gql`
    mutation change_statistic($id:Int, $title: String,
    $count: Int,
    ) {
        change_statistic(
            id: $id,
            title: $title,
            count: $count
        ) {
            id
            title
            count
        }
    }

`