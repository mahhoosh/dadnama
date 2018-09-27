import gql from 'graphql-tag';

export const EDIT_ABOUT_TEMPLATE = gql`
    mutation edit_about_template($title : String, $first_name : String,
    $last_name : String,$description : String,$text : String)
    {
        edit_about_template(
            title: $title,
            first_name: $first_name,
            last_name: $last_name,
            description: $description,
            text: $text
        )  {
            title
            first_name
            last_name
            text
            description
        }
    }
`