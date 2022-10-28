import { gql } from 'graphql-tag'

export const GET_CITY = gql`
  query getCity($id: SID!) {
    city(id: $id) {
      id
      name
    }
  }
`
