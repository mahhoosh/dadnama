import gql from 'graphql-tag';

export const SPLASH = gql`
    query {
        splash {
            time
            user_plan {
                expires_at
                domain
            }
            user {
                id
                name
                email
                mobile
            }
            user_template {
                color
                font
                template {
                    link
                    name
                    title
                    path
                    description
                    sort
                }
            }
            user_setting {
                domain
                type
                created_at
                updated_at
            }
        }
    }
`
