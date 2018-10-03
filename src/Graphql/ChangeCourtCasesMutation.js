import gql from 'graphql-tag';

export const CHANGE_COURT_CASES = gql`
    mutation Change_court_cases($id:Int,$title: String, $reference: String,
    $started_at: String,$stopped_at: String) {
        change_court_cases(
            id: $id,
            title: $title,
            reference: $reference,
            started_at: $started_at,
            stopped_at :$stopped_at
        )  {
            id
            title
            reference
            started_at
            stopped_at
        }
    }
`