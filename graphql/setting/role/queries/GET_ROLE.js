import { gql } from 'graphql-tag'

export const GET_ROLE = gql`
  query getRole($id: SID!) {
    role(id: $id) {
      id
      name
      shortname
      access
    }
  }
`
