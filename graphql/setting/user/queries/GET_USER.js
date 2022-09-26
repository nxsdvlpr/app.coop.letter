import { gql } from 'graphql-tag'

export const GET_USER = gql`
  query getUser($id: SID!) {
    user(id: $id) {
      id
      name
      phone
      username
      role {
        id
        name
        shortname
      }
    }
  }
`
