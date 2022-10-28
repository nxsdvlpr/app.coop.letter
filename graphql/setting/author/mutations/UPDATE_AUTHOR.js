import { gql } from 'graphql-tag'

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($input: UpdateAuthorInput!) {
    updateAuthor(input: $input) {
      id
    }
  }
`
