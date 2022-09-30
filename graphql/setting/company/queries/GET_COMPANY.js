import { gql } from 'graphql-tag'

export const GET_COMPANY = gql`
  query getCompany($id: SID!) {
    company(id: $id) {
      id
      name
      code
    }
  }
`
