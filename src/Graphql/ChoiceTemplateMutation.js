import gql from 'graphql-tag';

export const CHOICE_TEMPLATE = gql`
    mutation ChoiceTemplate($template: Int) {
        choice_template(
            template: $template
        ) {
            id
            font
            color
            user {
                id
                username
                mobile
            }
            template {
                id
                title
                name
                link
                path
                description
                sort
            }
            created_at
            updated_at
        }
    }
`