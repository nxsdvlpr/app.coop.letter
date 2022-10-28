import { gql } from 'graphql-tag'

export const GET_AUTHOR = gql`
  query getAuthor($id: SID!) {
    author(id: $id) {
      id
      name
    }
  }
`
