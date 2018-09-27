import gql from 'graphql-tag';

export const CHANGE_EDUCATIONALES = gql`
    mutation change_educationales($id:Int,$title: String, $city_id: Int,
    $started_at: String,$stopped_at: String) {
        change_educationales(
            id: $id,
            title: $title,
            city_id: $city_id,
            started_at: $started_at,
            stopped_at :$stopped_at
        )   {
            id
            title
            city{
                id
                title
            }
            started_at
            stopped_at
        }
    }
`